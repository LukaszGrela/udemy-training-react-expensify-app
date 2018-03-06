import React from 'react';
import { shallow } from 'enzyme';
import numeral from 'numeral';
import { ExpensesSummary } from '../../components/ExpensesSummary';
let wrapper, expensesCount, expenseTotal;
beforeEach(() => {
    expensesCount = 5;
    expenseTotal = 125459;
    wrapper = shallow(<ExpensesSummary
        expensesCount={expensesCount}
        expenseTotal={expenseTotal} />);
})

test('Rendered correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Rendered correctly with 1 expense', () => {
    const expensesCount = 1;
    const expenseTotal = 1;
    wrapper.setProps({
        expensesCount,
        expenseTotal
    });
    expect(wrapper).toMatchSnapshot();
});

test('Rendered correct message for 0 expenses', () => {
    const expensesCount = 0;
    const expenseTotal = 0;
    wrapper.setProps({
        expensesCount,
        expenseTotal
    });
    const expected = `Viewing ${expensesCount} expense${expensesCount !== 1 ? 's' : ''} totalling ${expenseTotal}`;

    expect(wrapper.text()).toBe(expected);
});

test('Rendered correct message for 1 expense', () => {
    const expensesCount = 1;
    const expenseTotal = 1;
    wrapper.setProps({
        expensesCount,
        expenseTotal
    });
    const expected = `Viewing ${expensesCount} expense${expensesCount !== 1 ? 's' : ''} totalling ${expenseTotal}`;

    expect(wrapper.text()).toBe(expected);
});

test('Rendered correct message for 1 expense', () => {
    const expensesCount = 1;
    const expenseTotal = 1;
    wrapper.setProps({
        expensesCount,
        expenseTotal
    });
    const expected = `Viewing ${expensesCount} expense${expensesCount !== 1 ? 's' : ''} totalling ${expenseTotal}`;

    expect(wrapper.text()).toBe(expected);
});