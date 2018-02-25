import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

import { DateRangePicker } from 'react-dates';


export class ExpenseListFilters extends Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({ startDate, endDate }) => {
        const { setStartDate, setEndDate } = this.props;
        setStartDate(startDate);
        setEndDate(endDate);
    }
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }
    onSortChange = (e) => {
        const { sortByAmount, sortByDate } = this.props;
        if (e.target.value === 'date') sortByDate();
        else if (e.target.value === 'amount') sortByAmount();
    }
    render() {
        const { dispatch, filters } = this.props;
        return (
            <div>
                <input
                    type="text"
                    value={filters.text}
                    onChange={this.onTextChange} />
                <select value={filters.sortBy}
                    onChange={this.onSortChange}>
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                    startDate={filters.startDate}
                    startDateId={'gd:expense_list_filters-start-date-id'}
                    endDate={filters.endDate}
                    endDateId={'gd:expense_list_filters-end-date-id'}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={_ => false}
                    showClearDates={true}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});


const mapDispatchToProps = (dispatch, props) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (date) => dispatch(setStartDate(date)),
    setEndDate: (date) => dispatch(setEndDate(date)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);