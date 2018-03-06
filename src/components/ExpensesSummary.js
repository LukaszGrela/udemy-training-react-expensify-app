import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export class ExpensesSummary extends React.Component {

    render() {

        return (
            <div className='expenses-summary'>
                {
                    `Viewing ${this.props.expensesCount} expense${this.props.expensesCount !== 1 ? 's' : ''} totalling ${this.props.expenseTotal}`
                }
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters)
    return {
        expensesCount: expenses.length,
        expenseTotal: numeral(selectExpensesTotal(expenses) / 100).format('$0,0.00'),
    }
};

export default connect(mapStateToProps)(ExpensesSummary);