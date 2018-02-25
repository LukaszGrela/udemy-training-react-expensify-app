import moment from 'moment';

// get visible expenses - selector
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
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
        if (sortBy === 'amount') {
            return a.amount === b.amount ? 0 : (a.amount < b.amount ? 1 : -1);
        }
        return 0;
    });
};