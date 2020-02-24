import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Item = (props) => {
	const item = props.children.item;
	return (
		<View style={styles.listItems}>
			<Text style={styles.itemStyle}>{item}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	listItems: {
	},
	itemStyle: {
		backgroundColor: '#fff',
		padding: 10,
		marginHorizontal: 15,
		fontSize: 20,
	}
});

export default Item;