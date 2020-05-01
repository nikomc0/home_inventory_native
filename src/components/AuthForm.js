import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitText }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View>
			<Spacer>
				<Text h4 style={styles.headerText}>{headerText}</Text>
			</Spacer>
			<Spacer>
				<Input 
					label="Email"
					value={email}
					onChangeText={setEmail}
					autoCapitalize='none'
					autoCorrect={false}
				/>
			</Spacer>
			<Spacer>
				<Input 
					label="Password"
					value={password}
					onChangeText={setPassword}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry
				/>
			</Spacer>
			<Spacer>
				{ errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
			</Spacer>
			<Spacer>
				<Button 
					title={submitText}
					onPress={() => onSubmit({ email, password })}
				/>
			</Spacer>
		</View>
	)
};

const styles = StyleSheet.create({
	headerText: {
		textAlign: 'center'
	},
	errorMessage: {
		fontSize: 16,
		color: 'red',
		textAlign: 'center'
	}
});

export default AuthForm;
