import React, {useContext, useState} from 'react';
import {UserContext} from '../context/userContext';
import {Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import LoginForm from './Login.js';
import Register from './Register.js';
import UserActive from './User.js';

function Header() {

	const [state] = useContext(UserContext)

	const navItem = (role) => {
		if(localStorage.getItem('token')){
			const user = <UserActive role={localStorage.getItem('role')} />
			return user
		}else{
			const user = <div><Register /><LoginForm /></div>
			return user
		}
	}

	console.log(navItem)
	
	return(
		<>
		<div className="container-fluid position-fixed" style={{zIndex: "300", top: "0"}}>
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
