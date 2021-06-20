import React, {useContext, useState} from 'react';
import {Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import LoginForm from './Login.js';
import Authentication from './Authentication.js';
import UserActive from './User.js';

function Header() {
	const navItem = (role) => {
		if(localStorage.getItem('token')){
			const user = <UserActive role={localStorage.getItem('role')} />
			return user
		}else{
			const user = <div><Authentication /></div>
			return user
		}
	}

	return(
		<>
		<div className="container-fluid">
			<nav className="navbar navbar-light foodways-navbar">
				<Nav.Link as={Link} to="/" className="navbar-brand">
					<span className="mr-2">FoodWays</span>
					<img src={process.env.PUBLIC_URL + '/logo.png'} />
				</Nav.Link>
				<div className="d-block position-relative">
					{navItem()}
				</div>
			</nav>
		</div>
		</>
	);
}

export default Header
