import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import Item from './Item';
import Input from './ItemInput';

const ItemList = ( {data, store, results, setSelectedItem, deleteData, withDetails, onStoreChange}) => {

	function onSwipeRight (){
	}

	return (
		<View style={styles.listContainer}>
			<View style={styles.listHeader}>
				<Text style={styles.headerText}>{store}</Text>
			</View>

			<View style={styles.listStyle}>
				<FlatList
					data={data}
					keyExtractor={ (item) => item.id }
					renderItem={({ item }) => {
						return (
							<Item 
								item={item} 
								onSwipeRight={onSwipeRight} 
								deleteItem={deleteData} 
								setSelectedItem={setSelectedItem} 
								withDetails={withDetails}
								setStore={(selectedStore) => {
									onStoreChange(selectedStore);
								}}/>
						)
					}}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	listContainer: {
		flexDirection: 'column',
		// flex: 1,
		paddingBottom: 5,
		marginHorizontal: 15,
	},
	listHeader: {
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 15,
		paddingBottom: 5,
	},
	listStyle: {
	},
	headerText: {
		flex: 1,
		fontSize: 20,
		textTransform: 'capitalize',
	}
});

export default ItemList;