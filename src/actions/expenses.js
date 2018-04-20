import database from '../firebase/firebase';

const dbExpenses = _ => database.ref('expenses');

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = {
            description, note, amount, createdAt
        }
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        });
    };
};



// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return dbExpenses().child(id).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};
// 1. Create startRemoveExpene
// 2. Test startRemoveExpense with 'should remove expenses from firebase'
// 3. Use startRemoveExpense in EditExpensePage instead of removeExpense
// 4. Adjust EditExpensePage tests

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value')
            .then((snapshot) => {
                const expenses = [];
                snapshot.forEach(child => {
                    expenses.push({
                        id: child.key,
                        ...child.val()
                    });
                });
                dispatch(setExpenses(expenses));
            });
    };
};