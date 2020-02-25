import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import Item from './Item';
import hi from '../api/hi';

const ItemList = () => {
	const [items, setItems] = useState("");
	const [results, setResults] = useState([]);
	const [refreshing, setRefreshing] = React.useState(false);

	function wait(timeout) {
	  return new Promise(resolve => {
	    setTimeout(resolve, timeout);
	  });
	}

	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    searchAPI();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

	const searchAPI = async () => {
		const response = await hi.get('/items', {
			// Not yet built in the HI API.
			// params: {

			// }
		});
		setItems(response.data);
	};

	return (
		<View style={styles.listContainer}>
				<View style={styles.listHeader}>
					<SimpleLineIcons name="list" size={30}/>
					<Text style={styles.headerText}>Items</Text>
				</View>

			<View style={styles.listStyle}>
				<FlatList
					data={items}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					keyExtractor={ item => item.item}
					renderItem={({ item }) => {
						return (
							<Item>{item}</Item>
						)
					}}
				/>
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