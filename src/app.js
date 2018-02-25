import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore';

import getVisibleExpenses from './selectors/expenses'
import { setTextFilter, sortByAmount } from './actions/filters'
import { addExpense } from './actions/expenses';

import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

import './styles/styles.scss';

const store = configureStore();

console.log('App', store.getState());

store.subscribe(() => {

    const state = store.getState();
    const visible = getVisibleExpenses(state.expenses, state.filters);

    console.log(visible);
});

// store.dispatch(addExpense({ description: 'Water Bill', note: 'Southampton Water Supply', amount: 3095, createdAt: (new Date(2018, 0, 1).getTime()) }));
// store.dispatch(addExpense({ description: 'Gas Bill', note: 'NPower', amount: 1255, createdAt: (new Date(2018, 0, 5).getTime()) }));
// store.dispatch(addExpense({ description: 'Rent', note: 'Council Flat', amount: 40255, createdAt: (new Date(2018, 0, 2).getTime()) }));

// store.dispatch(setTextFilter('bill'));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider >
);

ReactDOM.render(jsx, document.getElementById('app'));
