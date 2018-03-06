export default (expenses = []) => {
    return expenses.reduce((total, expense) => expense.amount + total, 0);
};