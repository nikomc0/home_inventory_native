import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
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

export default createAppContainer(navigator);
