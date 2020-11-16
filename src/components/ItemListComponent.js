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

	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			sortedItems: [],
		}
		this.getItems = Context._currentValue.getItems;
	}

	componentDidMount() {
		console.log(this.getItems);
		console.log("Component Did Mount")
	}

	componentWillUnmount() {
		console.log("Component Will Unmount")
	}

	render(){
		const {
			data, 
			store, 
			deleteData, 
			withDetails, 
			onStoreChange
		} = this.props;

		const {state, getItems, getLocalItems, setLocalItems, editItem} = this.context;

		function setLocalData(data, store){
			data.map((item, index) => {
				item.location = index;
				editItem(item).then(getItems());
			});
		}

	 	return (
			<View>
	      <DraggableFlatList
	      	style={styles.listContainer}
	        data={this.state.data}
	        extraData={this.state.data}
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
        		this.setState({data});
        		setLocalData(data, store);
	        }}/>
	    </View>
	  )
	}
}

const styles = StyleSheet.create({
	listContainer: {

	},
});
