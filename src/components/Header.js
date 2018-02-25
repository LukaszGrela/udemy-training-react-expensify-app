import React from 'react';

import { Link, NavLink } from "react-router-dom";


const Header = () => (
    <header>
        <h1>Expensify</h1>
        <div>
            <NavLink to="/" exact activeClassName='is-active'>Dashboard</NavLink>
            <NavLink to="/create" exact activeClassName='is-active'>Create Expense</NavLink>
            <NavLink to="/help" exact activeClassName='is-active'>Help</NavLink>
        </div>
    </header>
);

export default Header;