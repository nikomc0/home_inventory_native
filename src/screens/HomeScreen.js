import React, { useContext, useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import Item from '../components/Item';
import NewItem from '../components/NewItem';
import hi from '../api/hi';
import { Context as ItemContext } from '../context/ItemContext';
import { AppState } from 'react-native';

const HomeScreen = ({ navigation }) => {
	const {state, getItems, addItem, editItem} = useContext(ItemContext);
	const [errorMessage, setErrorMessage] = useState("");

	const [newItemInput, showNewItemInput] = useState(false);
	const [itemToAdd, setItemToAdd] = useState("");
	const [storeToAdd, setStoreToAdd] = useState("");
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
   	getItems();
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

	function wait(timeout) {
	  return new Promise(resolve => {
	    setTimeout(resolve, timeout);
	  });
	}

	const filterStoresByCompleted = () => {
		if (state.stores){
			return state.stores.filter((store) => {
				return onlyNotCompleted(store.items);
			})
		}
	}

	const filterItemsByStore = (store) => {
		return state.items.filter(item => {
			if (!item.complete) {
				return item.store_info.name === store; 
			}
		});
	}

	const onlyNotCompleted = (arr) => {
		for (let item of arr) {
			if (!item.complete) {
				return item;
			}
		}
	}

	const deleteData = async (item) => {
		try {
			const response = await hi.delete(`/items/${item.id}`);
			getData();
		} catch (error){
			setErrorMessage('Failed to Delete Item')
		}
	}

	const clearState = () => {
		setItemToAdd("");
		setStoreToAdd("");
	}

	const newItem = () => {
		showNewItemInput(!newItemInput);
	}

	const setSelectedItem = (item) => {
		item.complete = !item.complete;
		editItem(item);
		onRefresh();
	}

	useEffect(() => {
		getItems();
		console.log(state)
	}, []);

  return (
    <View style={styles.container}>
			<FlatList
				style={styles.listStyle} 
				data={state.stores}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				keyExtractor={ store => store.id}
				renderItem={({ item }) => {
					return (
						<ItemList 
							results={filterItemsByStore(item.name)}  
							deleteData={deleteData}
							data={item.items}
							setSelectedItem={setSelectedItem} 
							store={item.name}
							/>
					)
				}}
			/>
			
			{ newItemInput ?
				<NewItem 
					style={styles.newItemInput}
					stores={state.stores}
					itemToAdd={itemToAdd}
					storeToAdd={storeToAdd}
					onItemChange={(newItemToAdd) => setItemToAdd(newItemToAdd)}
					onStoreChange={(newStoreToAdd) => setStoreToAdd(newStoreToAdd)}
					onItemSubmit={(newItem, store) => {
						addItem(itemToAdd, storeToAdd);
						clearState();
					}}
					toggle={newItem}/> : null
			}
			
			<View style={styles.footer}>
				<TouchableOpacity 
					onPress={newItem}>
					{ newItemInput ? 
						<SimpleLineIcons
						style={styles.addItemButton}
						name="close" />
						:
						<SimpleLineIcons 
						style={styles.addItemButton} 
						name="plus"/> 
					}
				</TouchableOpacity>
			</View>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
  	flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
	listStyle: {
	},
	newItemInput: {
		flex: 2,
	},
  footer: {
		paddingTop: 10,
		paddingBottom: 25,
	},
	addItemButton: {
		alignSelf: 'center',
		fontSize: 50,
	},
});

export default HomeScreen;
