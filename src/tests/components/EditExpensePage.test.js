import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';


let wrapper,
    history,
    editExpense,
    removeExpense,
    modifiedExpense;
beforeEach(() => {
    history = { push: jest.fn() };
    editExpense = jest.fn();
    removeExpense = jest.fn();
    wrapper = shallow(
        <EditExpensePage
            expense={expenses[0]}
            editExpense={editExpense}
            removeExpense={removeExpense}
            history={history} 
            />);

    modifiedExpense = { note: 'my note', amount: 99000 };
})


test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

// spies
test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(modifiedExpense);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, modifiedExpense);
});

// 
// spies
test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click', { preventDefault: _ => { } });
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
});