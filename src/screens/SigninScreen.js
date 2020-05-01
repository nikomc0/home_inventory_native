import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import Link from '../components/Link';

const SigninScreen = () => {
	const {state, signin, clearErrorMessage } = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<NavigationEvents 
				onWillFocus={clearErrorMessage}/>
			<AuthForm 
				headerText="Sign in to your account"
				errorMessage={state.errorMessage}
				submitText="Sign In"
				onSubmit={signin}/>
			<Link 
				text="Need and account? Sign Up"
				routeName="Signup"/>
		</View>
	)
};

SigninScreen.navigationOptions = () => {
	return {
		headerShown: false
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginBottom: 150,
	},
});

export default SigninScreen;
