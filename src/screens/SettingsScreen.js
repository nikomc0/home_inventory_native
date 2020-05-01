import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SettingsScreen = () => {
	const { state, signout } = useContext(AuthContext);

	return (
		<View>
			<Spacer>
				<Text h4>Account Information</Text>
			</Spacer>
			<Spacer>
				<Text>Currently logged in as {state.user}</Text>
			</Spacer>
			<Spacer>
				<Button 
					title="Sign Out"
					onPress={signout}/>
			</Spacer>
		</View>
	);
}

export default SettingsScreen;
