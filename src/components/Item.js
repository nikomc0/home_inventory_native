import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Item = () => {
	return (
		<View style={styles.listItems}>
			<Text>ITEM 1</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	listItems: {
		marginLeft: 15,
	}
});

export default Item;