// import objek useReduce dan useContext dari liblary react
import {useReducer, createContext} from 'react';

// export objek useContext agar bisa gunakan di komponen lain
export const UserContext = createContext();

// membuat variable initialState untuk menampung nilai awal dari form login
const initialState = {
	isLogin: true,
	user: null
}

// membuat function reducer untuk membuat kondisi 
const reducer = (state, action) => {
	const {type, payload} = action;

	switch(type){
		case "LOGIN_SUCCESS":
			return{
				...state,
				isLogin: true,
			};
		case "USER_VALID":
			return{
				...state,
				user: payload,
				isLogin: true,
			};
		case "LOGOUT":
			return{
				...state,
				isLogin: false,
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

