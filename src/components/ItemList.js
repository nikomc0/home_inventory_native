import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import Item from './Item';
import hi from '../api/hi';

const searchAPI = async () => {
	const response = await hi.get('/items', {
		// Not yet built in the HI API.
		// params: {

		// }
	});
	var list = response.data;
	return list;
};

searchAPI();

const ItemList = () => {
	const [item, setItems] = useState("");
	const [results, setResults] = useState([]);
	
	return (
		<View style={styles.listContainer}>
			<View style={styles.listHeader}>
				<SimpleLineIcons name="list" size={30}/>
				<Text style={styles.headerText}>Items</Text>
			</View>

			<View style={styles.listStyle}>
				<FlatList
					data={list}
					keyExtractor={ item => item.item}
					renderItem={({ item }) => {
						return (
							<Item>{item}</Item>
						)
					}}
				/>
				<Text>{list}</Text>
			</View>

			<View style={styles.footer}>
				<TouchableOpacity 
					onPress={() => {console.log("Pressed")}}>
					<SimpleLineIcons style={styles.addItemButton} name="plus"/>	
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	listContainer: {
		flexDirection: 'column',
		flex: 1,
	},
	listHeader: {
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 15,
	},
	listStyle: {
		flex: 7,
	},
	headerText: {
		flex: 1,
		marginHorizontal: 15,
		fontSize: 20,
	},
	footer: {
		// backgroundColor: '#F0EEEE',
		flex: 1
	},
	addItemButton: {
		alignSelf: 'center',
		fontSize: 50,
	},
});

export default ItemList;