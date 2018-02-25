import React from 'react';
import moment from 'moment';
import { shallow } from "enzyme";
import 'react-dates/initialize';

import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate,
    sortByAmount, setStartDate,
    setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(<ExpenseListFilters
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        filters={filters}
    />);
});

test('should render ExpenseListFitlers correctly', () => {
    expect(wrapper).toMatchSnapshot();
})
test('should render ExpenseListFitlers with alt date correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
})

// 
test('should handle text change', () => {
    const value = "my text";
    wrapper.find('input').simulate('change', { target: { value } });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});
// 
test('should sort by date', () => {
    wrapper.setProps({
        filters: altFilters
    });
    const value = 'date';
    wrapper.find('select').simulate('change', { target: { value } });
    expect(sortByDate).toHaveBeenCalled();
});
// 
test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', { target: { value } });
    expect(sortByAmount).toHaveBeenCalled();
});
//
test('should handle date change', () => {
    const startDate = moment(0);
    const endDate = moment(0).add(4, 'days');
    wrapper.find('withStyles(DateRangePicker)')
        .prop('onDatesChange')({ startDate, endDate });

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});
// 
test('should handle date focus changes', () => {
    let focused = 'startDate';
    const onFocusChange = wrapper.find('withStyles(DateRangePicker)')
        .prop('onFocusChange');
    onFocusChange(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
    focused = 'endDate';
    onFocusChange(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
    focused = null;
    onFocusChange(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
});