import expensesReducer from '../../reducers/expenses'
import moment from 'moment';

import expenses from '../fixtures/expenses';


test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});
test('should NOT remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

// 
test('should add an expense', () => {
    const expense = {
        id: '4',
        description: 'Laptop',
        note: 'Acer',
        amount: 45000,
        createdAt: -1
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action);

    // expect(state[state.length - 1]).toEqual(expense);
    expect(state).toEqual([...expenses, expense]);
});
// 
test('should edit an expense', () => {
    const expense = {
        ...expenses[2],
        description: 'Laptop',
        note: 'Acer'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[2].id,
        updates: expense
    }
    const state = expensesReducer(expenses, action);

    expect(state[2]).toEqual(expense);
});
//should not edit expense if expense not found
test('should not edit expense if expense not found', () => {
    const expense = {
        ...expenses[2],
        description: 'Laptop',
        note: 'Acer'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: expense
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});