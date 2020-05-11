import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Context as ItemContext } from '../context/ItemContext';

const StoreScreen = ({navigation}) => {
	const {state, getItems, addItem, editItem, newItem} = useContext(ItemContext);

	useEffect(() => {
		console.log(state);
	}, [])

	return (
		<View>
			<Text>{navigation.state.params.store.title}</Text>

		</View>
	)
}

export default StoreScreen;
