import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Context as ItemContext } from '../context/ItemContext';

const StoreScreen = ({navigation}) => {
	useEffect(() => {

	}, [])

	return (
		<View>
			<Text>{navigation.state.params.store.title}</Text>

		</View>
	)
}

export default StoreScreen;
