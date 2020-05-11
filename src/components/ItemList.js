import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SimpleLineIcons } from '@expo/vector-icons';
import Item from './Item';
import Input from './ItemInput';
import DraggableFlatList from 'react-native-draggable-flatlist'

const ItemList = ( {data, store, results, setSelectedItem, deleteData, withDetails, onStoreChange}) => {
	const [state, setState] = useState(data);

  const renderItem = ({ item, drag,}) => {
    return (
			<Item 
				item={item} 
				deleteItem={deleteData} 
				setSelectedItem={setSelectedItem} 
				withDetails={withDetails}
				setStore={(selectedStore) => onStoreChange(selectedStore)}
				onLongPress={drag}/>
    );
  };

  useEffect(()=>{
  	console.log(state);
  }, []);
   
 	// return (
  //   <View style={{ flex: 1 }}>
  //     <DraggableFlatList
  //       data={state}
  //       keyExtractor={(item, index) => `draggable-item-${item._id.$oid.toString()}`}
  //       renderItem={({ item, drag }) => {
  //       	return(
		// 				<Item 
		// 					item={item} 
		// 					deleteItem={deleteData} 
		// 					setSelectedItem={setSelectedItem} 
		// 					withDetails={withDetails}
		// 					setStore={(selectedStore) => onStoreChange(selectedStore)}
		// 					onLongPress={drag}/>
  //       	)
  //       }}
  //       onDragEnd={({ data }) => setState(data)}/>
  //   </View>
  // )


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
								deleteItem={deleteData} 
								setSelectedItem={setSelectedItem} 
								withDetails={withDetails}
								setStore={(selectedStore) => onStoreChange(selectedStore)}/>
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