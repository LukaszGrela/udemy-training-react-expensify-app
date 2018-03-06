import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseTotal, expensesCount }) => {

    const expenseTotalLabel = numeral(expenseTotal / 100).format('$0,0.00');
    return (
        <div className='expenses-summary'>
            {
                `Viewing ${expensesCount} expense${expensesCount !== 1 ? 's' : ''} totalling ${expenseTotalLabel}`
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters)
    return {
        expensesCount: expenses.length,
        expenseTotal: selectExpensesTotal(expenses),
    }
};

export default connect(mapStateToProps)(ExpensesSummary);