import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    tartSetExpenses,
    startRemoveExpense,
    startSetExpenses,
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    })
    database.ref('expenses').set(expensesData).then(() => done());
})




test('should setup remove expense action object',
    () => {
        const id = '123abc';

        const action = removeExpense({ id: id });

        expect(action).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
    });

test('should setup edit expense action object',
    () => {
        const id = '123abc';
        const updates = { note: 'New note' };
        const action = editExpense(id, updates);
        expect(action).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
    });

    test('should edit expenses from firebase', (done) => {
        const store = createMockStore({});
        const id = expenses[expenses.length - 1].id;
        const change = {
            note: 'Peugeot'
        };
        store.dispatch(startEditExpense(id,change)).then(_ => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates:change
            });
            return database.ref(`expenses/${id}`).once('value');
        }).then(snapshot => {
            const expense = snapshot.val();
            expect(expense.note).toEqual(change.note);
            done();
        });
    });


test('should setup add expense action object with given values', () => {

    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should remove expenses from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[expenses.length - 1].id;
    store.dispatch(startRemoveExpense({ id })).then(_ => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});

    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                ...expenseData,
                id: expect.any(String)
            }
        });
        //
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const defaultData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0

    };
    const store = createMockStore({});
    store.dispatch(startAddExpense()).then(() => {

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                ...defaultData,
                id: expect.any(String)
            }
        });
        //
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData);
        done();
    })
});

test('should setup setExpenses action object with data', () => {

    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});
test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});