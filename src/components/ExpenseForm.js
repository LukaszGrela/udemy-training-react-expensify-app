import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';


class ExpenseForm extends Component {

    constructor(props) {
        super(props);
        let amount = '';
        let createdAt = moment();
        const { description = '',
            note = '',
            amount: cAmount = amount,
            createdAt: cCreatedAt = createdAt } = props.expense || {};
        if (cAmount) amount = (cAmount / 100).toString();
        if (typeof cCreatedAt === 'number') createdAt = moment(cCreatedAt);
        this.state = {
            description,
            note,
            amount,
            createdAt,
            calendarFocused: false,
            error: '',
            isEdit: !!props.expense
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }
    onAmounChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            // Set error state equal to 
            this.setState(() => ({ error: 'Please provide description and amount.' }))
        } else {
            // clear error
            this.setState(() => ({ error: '' }))
            this.props.onSubmit && this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <div className='error'>{this.state.error}</div>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        autoFocus
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onDescriptionChange} />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmounChange} />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={_ => false}
                    />
                    <textarea
                        value={this.state.note}
                        placeholder="Add a note for your expense (optional)"
                        onChange={this.onNoteChange}></textarea>
                    <button>{this.state.isEdit ? 'Update':'Add'} Expense</button>
                </form>
            </div>
        );
    }
}

export default ExpenseForm;