import { addExpense, editExpense, removeExpense } from '../../actions/expenses';


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

test('should setup add expense action object with given values', () => {
    const expenseData = {
        description: 'Rent',
        note: 'My note',
        amount: 100,
        createdAt: 1000
    };
    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});
test('should setup add expense action object with default values', () => {
    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});