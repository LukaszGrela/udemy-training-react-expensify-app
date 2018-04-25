import React from 'react';
import {connect} from 'react-redux';

import { Link, NavLink } from "react-router-dom";
import { startLogout } from '../actions/auth';


export const Header = ({logOut}) => (
    <header>
        <h1>Expensify</h1>
        <div>
            <NavLink to="/dashboard" exact activeClassName='is-active'>Dashboard</NavLink>
            <NavLink to="/create" exact activeClassName='is-active'>Create Expense</NavLink>
            <NavLink to="/help" exact activeClassName='is-active'>Help</NavLink>
            <button className='logout' onClick={logOut}>LOGOUT</button>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(startLogout())
})
export default connect(undefined, mapDispatchToProps)(Header);