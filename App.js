import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as ItemProvider } from './src/context/ItemContext';
import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  loadingScreen: LoadingScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
  }),

  mainFlow: createStackNavigator({
    Home: HomeScreen,
    Settings: SettingsScreen,
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
	return (
      <AuthProvider>
			  <ItemProvider>
				  <App ref={(navigator) => {setNavigator(navigator)}}/>
			  </ItemProvider>
      </AuthProvider>
	)
};
