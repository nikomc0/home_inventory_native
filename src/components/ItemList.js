import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import Item from './Item';
import hi from '../api/hi';


const ItemList = ( {data, store, results}) => {
	const items = results;
	const errorMessage = data.error;

	function onSwipeLeft (){

	};

	function onSwipeRight (){

	}

	return (
		<View style={styles.listContainer}>
			<View style={styles.listHeader}>
				<Text style={styles.headerText}>{store}</Text>
			</View>
				{errorMessage ? <Text>{errorMessage}</Text> : null}

			<View style={styles.listStyle}>
				<FlatList
					data={items}
					keyExtractor={ item => item.item}
					renderItem={({ item }) => {
						return (
							<Item item={item} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}/>
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
		marginHorizontal: 15,
		paddingTop: 15,
		
	},
	listStyle: {
	},
	headerText: {
		flex: 1,
		marginHorizontal: 15,
		fontSize: 20,
		textTransform: 'capitalize',
	}
});

export default ItemList;