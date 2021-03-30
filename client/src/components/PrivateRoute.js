import {Route, Redirect} from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from '../context/userContext';

const PrivateRoute = ({component: Component, ...rest}) => {
	const [state] = useContext(UserContext)

	return (
		<Route
	      {...rest}
	      render={ (props) => 
	        localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/" />
	      }
	    />
	)
}

export default PrivateRoute;