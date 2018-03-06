import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should show total of 0 for empty selection', () => {
    const total = selectExpensesTotal();

    expect(total).toBe(0);
});

test('should show total of 50000150 for all entries', () => {
    const total = selectExpensesTotal(expenses);

    expect(total).toBe(50000150);
});

test('should show total of 100 for one entry', () => {
    const total = selectExpensesTotal([expenses[0]]);

    expect(total).toBe(100);
});