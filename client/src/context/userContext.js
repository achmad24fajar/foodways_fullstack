// import objek useReduce dan useContext dari liblary react
import {useReducer, createContext} from 'react';

// export objek useContext agar bisa gunakan di komponen lain
export const UserContext = createContext();

// membuat variable initialState untuk menampung nilai awal dari form login
const initialState = {
	isLogin: false,
	user: null,
	loading: true,
}

// membuat function reducer untuk membuat kondisi 
const reducer = (state, action) => {
	const {type, payload} = action;

	console.log(payload)

	switch(type){
		case "USER_SUCCESS":
		case "LOGIN_SUCCESS":
			localStorage.setItem("token", payload.token)
			localStorage.setItem("role", payload.role)
			return{
				...state,
				isLogin: true,
				user: {
					fullname: payload.fullname,
					email: payload.email,
					role: payload.role
				},
				loading: false,
			};
		case "USER_VALID":
			localStorage.setItem("token", payload.token)
			localStorage.setItem("role", payload.role)
			return{
				...state,
				user: payload,
				isLogin: true,
			};
		case "AUTH_ERROR":
		case "LOGOUT":
		 	localStorage.removeItem("token")
		 	localStorage.removeItem("role")
			return{
				...state,
				isLogin: false,
				loading: false
			};
		default:
			throw new Error();
	}
}

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<UserContext.Provider value={[state, dispatch]}>
		    {children}
		</UserContext.Provider>
	);
};

