import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import Item from './Item';
import Input from './ItemInput';

const ItemList = ( {data, store, results, setSelectedItem, deleteData}) => {

	// const errorMessage = data.error;

	function onSwipeRight (){
	}

	return (
		<View style={styles.listContainer}>
			<View style={styles.listHeader}>
				<Text style={styles.headerText}>{store}</Text>
			</View>

			<View style={styles.listStyle}>
				<FlatList
					data={results}
					keyExtractor={ (item) => item.id }
					renderItem={({ item }) => {
						return (
							<Item item={item} onSwipeRight={onSwipeRight} deleteItem={deleteData} setSelectedItem={setSelectedItem}/>
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
		flex: 1,
		paddingBottom: 10,
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