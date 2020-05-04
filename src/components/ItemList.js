import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SimpleLineIcons } from '@expo/vector-icons';
import Item from './Item';
import Input from './ItemInput';

const ItemList = ( {data, store, results, setSelectedItem, deleteData, withDetails, onStoreChange}) => {

	function onSwipeRight (){
	}

	return (
		<View style={styles.listContainer}>
			<View style={styles.listStyle}>
				<FlatList
					data={data}
					keyExtractor={ (item, index) => item._id.$oid.toString() }
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
		marginHorizontal: 15,
	},
	headerText: {
		flex: 1,
		fontSize: 20,
		textTransform: 'capitalize',
	}
});

export default ItemList;