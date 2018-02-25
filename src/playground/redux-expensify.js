import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'

const demoState = {
    expenses: [{
        id: 'abc',
        description: 'January Rent',
        note: 'This as the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

console.log('demoState', demoState);
console.log('-----------------------');

// const user = {
//     name: 'Aneta',
//     age: 35
// }

// console.log({ ...user });
// console.log({ ...user, location: 'Southampton', age: 18 });


// ADD_EXPENSE
const addExpense = (
    {
    description = '',
        note = '',
        amount = 0,
        createdAt = 0 } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})
// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})
// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})
// SET_START_DATE
const setStartDate = (timestamp) => ({
    type: 'SET_START_DATE',
    timestamp
});
// SET_END_DATE
const setEndDate = (timestamp) => ({
    type: 'SET_END_DATE',
    timestamp
});
const expensesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                return expense;
            })
        default:
            return state;
    }
}
// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.timestamp
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.timestamp
            }
        default:
            return state;
    }
}
// get visible expenses - selector
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        // const textMatch = typeof text !== 'string' || text === '' 
        // ||  expense.description.toLowerCase().indexOf(text.toLowerCase()) !== -1
        // ||  expense.note.toLowerCase().indexOf(text.toLowerCase()) !== -1;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) ||
            expense.note.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt === b.createdAt ? 0 : (a.createdAt < b.createdAt ? 1 : -1);
        }
        if(sortBy === 'amount') {
            return a.amount === b.amount ? 0 : (a.amount < b.amount ? 1 : -1);
        }
        return 0;
    });
};
// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);
store.subscribe(() => {

    const state = store.getState();
    const visible = getVisibleExpenses(state.expenses, state.filters);

    console.log(visible);
})

// store.dispatch(sortByAmount());
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 50, createdAt: -1200 }));
const expenseThree = store.dispatch(addExpense({ description: 'Ticket', amount: 150, createdAt: 900 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500, note: 'Yuck! Dont buy here ever!' }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter('coFFee'));
// store.dispatch(setTextFilter('TICK'));
// store.dispatch(setTextFilter('C'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate((new Date).getTime()));
// store.dispatch(setStartDate(1100));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate((new Date).getTime()));
// store.dispatch(setEndDate(2000));
// store.dispatch(setEndDate());
