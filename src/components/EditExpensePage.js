import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {
    editExpense,
    removeExpense
} from '../actions/expenses';


export class EditExpensePage extends Component {
    state = {}
    onSubmit = (inExpense) => {
        const {
            editExpense,
            history,
            expense
        } = this.props;
        editExpense(expense.id, inExpense);
        history.push('/');
    };
    onRemove = (e) => {
        e.preventDefault();
        const {
            removeExpense,
            history,
            expense
        } = this.props;
        removeExpense({ id: expense.id });
        history.push('/');
    };
    render() {
        const {
            expense
        } = this.props;
        return (
            <div>
                <ExpenseForm
                    expense={expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    removeExpense: (data) => {
        dispatch(removeExpense(data));
    },
    editExpense: (id, updates) => {
        dispatch(editExpense(id, updates));
    }
});

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => (expense.id === props.match.params.id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);