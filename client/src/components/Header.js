import React, {useContext, useState} from 'react';
import {UserContext} from '../context/userContext';
import {Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import LoginForm from './Login.js';
import Register from './Register.js';
import UserActive from './User.js';

function Header() {

	const [state] = useContext(UserContext)

	console.log(state.user)
	
	return(
		<>
		<div className="container-fluid position-fixed" style={{zIndex: "200", top: "0"}}>
			<nav className="navbar navbar-light foodways-navbar">
				<Nav.Link as={Link} to="/" className="navbar-brand">
					<span className="mr-2">FoodWays</span>
					<img src={process.env.PUBLIC_URL + '/logo.png'} />
				</Nav.Link>
				<div className="d-block position-relative">
				{(state.isLogin) ? (
					<UserActive role="partner" />
				):(
					<>
					<Register />
					<LoginForm />
					</>
				)}
				</div>
			</nav>
		</div>
		</>
	);
}

export default Header
