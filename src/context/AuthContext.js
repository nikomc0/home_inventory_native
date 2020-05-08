import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';
import createDataContext from './createDataContext';
import auth from '../api/auth';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'signin':
			return { errorMessage: '', token: action.payload.token, user: action.payload.email };
		case 'signout':
			return {token: null, errorMessage: '', user: null};
		case 'add_error':
			return {...state, errorMessage: action.payload};
		case 'clear_error_message':
			return {...state, errorMessage: ''};
		default:
			return state;
	}
}

const clearErrorMessage = (dispatch) => {
	return () => {
		dispatch({ type: 'clear_error_message' })
	}
}

const signup = (dispatch) => {
	return async ({ email, password }) => {
		try {
			const response = await auth.post('/signup', { email, password });
			await AsyncStorage.setItem('token', response.data.token);
			await AsyncStorage.setItem('user', response.data.user.email);
			
			dispatch({ type: 'signin', payload: {email: email, token: response.data.token }});

			navigate('Home');
		} catch (error) {
			dispatch({ type: 'add_error', payload: error.response.data.email })
		}
	}
}

// Implicit return vs. signup {return ...}
const signin = (dispatch) => async ({ email, password }) => {
		try {
			const response = await auth.post('/signin', { email: email, password: password });
			await AsyncStorage.setItem('token', response.data.token); 
			await AsyncStorage.setItem('user', response.data.user.email);
			
			dispatch({ type: 'signin', payload: {email: email, token: response.data.token }});
			navigate('Home');

		} catch (error) {
			dispatch({ type: 'add_error', payload: error.response.data.messages })
		} 
	}

const signout = (dispatch) => async () => {
	try {
		const response = await auth.post('/signout');
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('user');
		dispatch({ type: 'signout' });
		navigate('loginFlow');
	} catch (error) {
		console.log(error)
	}
}

const getToken = (dispatch) => async () => {
	const token = await AsyncStorage.getItem('token');
	const user = await AsyncStorage.getItem('user');
	console.log({token, user});
	if (token && user) {
		dispatch({ type: 'signin', payload: { email: user, token: token }});
		navigate('Home');
	} else {
		navigate('loginFlow');
	}
}

export const { Context, Provider } = createDataContext(
	authReducer,
	{signup, signin, clearErrorMessage, getToken, signout},
	{ token: null, errorMessage: "", user: null}
);