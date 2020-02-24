import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import Item from './Item';

const ItemList = () => {
	return (
		<View>
			<View style={styles.listHeader}>
				<SimpleLineIcons name="list" size={30}/>
				<Text style={styles.headerText}>Items</Text>
			</View>
			<Item />
		</View>
	)
}

const styles = StyleSheet.create({
	listHeader: {
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 15,
	},
	headerText: {
		flex: 1,
		marginHorizontal: 15,
		fontSize: 20,
	},
});

export default ItemList;