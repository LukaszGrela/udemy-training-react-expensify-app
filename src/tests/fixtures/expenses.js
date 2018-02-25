import moment from 'moment';

export default [{
    id: '1',
    description: 'Rent',
    note: 'My note',
    amount: 100,
    createdAt: 0
}, {
    id: '2',
    description: 'Gum',
    note: '',
    amount: 50,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Car',
    note: 'Renault',
    amount: 50000000,
    createdAt: moment(0).add(4, 'days').valueOf()
}];
