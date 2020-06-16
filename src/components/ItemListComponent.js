import React, {useState, useEffect, useContext, PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SimpleLineIcons } from '@expo/vector-icons';
import Item from './Item';
import Input from './ItemInput';
import DraggableFlatList from 'react-native-draggable-flatlist'
import { Context } from '../context/ItemContext';

export default class ItemListComponent extends PureComponent {
	static contextType = Context;

	render(){
		const {
			data, 
			store, 
			results, 
			deleteData, 
			withDetails, 
			onStoreChange
		} = this.props;

		const {state, getLocalItems, setLocalItems} = this.context;

		function setLocalData(data, store){
			setLocalItems(data, store);
		}

	 	return (
			<View style={{ flex: 1 }}>
	      <DraggableFlatList
	      	style={styles.listContainer}
	        data={data}
	        keyExtractor={(item, index) => `draggable-item-${item._id.$oid.toString()}`}
	        renderItem={({ item, drag }) => {
	        	return(
							<Item 
								item={item} 
								deleteItem={deleteData} 
								withDetails={withDetails}
								setStore={(selectedStore) => onStoreChange(selectedStore)}
								onLongPress={drag}/>
	        	)
	        }}
	        onDragEnd={({ data }) => {
	        	setLocalItems(state, store, data);
	        		// this.setState({data});
	        		// setLocalData(data, store);
	        	}
	        }/>
	    </View>
	  )
	}
}

const styles = StyleSheet.create({
	listContainer: {

	},
});
