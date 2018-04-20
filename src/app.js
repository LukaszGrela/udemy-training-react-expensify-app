import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore';

import getVisibleExpenses from './selectors/expenses'
import { setTextFilter, sortByAmount } from './actions/filters'
import { startSetExpenses } from './actions/expenses';

import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

import './firebase/firebase.js'

import './styles/styles.scss';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider >
);
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});

