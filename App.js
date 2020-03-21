import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Provider as ItemProvider } from './src/context/ItemContext';
import HomeScreen from './src/screens/HomeScreen';

const navigator = createStackNavigator({
  Home: HomeScreen
  }, 
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Home Inventory'
  }
});

const App = createAppContainer(navigator);

export default () => {
	return <ItemProvider><App /></ItemProvider>;
};
