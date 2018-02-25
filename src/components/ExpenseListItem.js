import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
    const createdAtLabel = moment(createdAt).format();
    return (
    <div>
        <h3><Link to={`/edit/${id}`}>{description}</Link></h3>
        <p>{amount} - {createdAtLabel}</p>
    </div>
)};

export default ExpenseListItem;