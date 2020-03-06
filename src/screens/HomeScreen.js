import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import Item from '../components/Item';
import NewItem from '../components/NewItem';
import hi from '../api/hi';

const HomeScreen = () => {
	const [items, setItems] = useState("");
	const [stores, setStores] = useState("");
	const [newItemInput, showNewItemInput] = useState(false);
	const [itemToAdd, setItemToAdd] = useState("");
	const [storeToAdd, setStoreToAdd] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
   	getData();
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

	function wait(timeout) {
	  return new Promise(resolve => {
	    setTimeout(resolve, timeout);
	  });
	}

	const filterItemsByStore = (store) => {
		return items.items.filter(item => {
			return item.store.store === store.store; 
		});
	}

	function alphabetical(key){
		var sortOrder = 1;

		if (key[0] === "-") {
			sortOrder = -1;
			key = key.substr(1);
		}

		return function (a, b){
			if (sortOrder == -1) {
				return b[key].localeCompare(a[key]);	
			} else {
				return a[key].localeCompare(b[key]);
			}
		}
	};

	const getData = async () => {
		try {
			var storesList = {};
			const response = await hi.get('/items');
				setItems(response.data);
				setStores(response.data.stores);
		} catch (error) {
			setErrorMessage('Something went wrong')
		}
	};

	const saveData = async (item, store) => {
		console.log({item, store})
		try {
			if (item && store){		
				const response = await hi.post('/items', {
					item: item,
					store: store
				});
				getData();
				clearState();
			} else {
				setErrorMessage('Missing Values')
			}
		} catch (error) {
			setErrorMessage('Failed to Save Item')
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

	const addItem = () => {
		showNewItemInput(!newItemInput);
	}

	useEffect(() => {
		getData();
	}, []);

  return (
    <View style={styles.container}>
			<FlatList
				style={styles.listStyle} 
				data={stores}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				keyExtractor={(store) => store.store}
				renderItem={({ item }) => {
					return (
						<ItemList 
							results={filterItemsByStore(item)} 
							searchAPI={getData} 
							deleteData={deleteData}
							data={items} 
							store={item.store}
							error={errorMessage} 
							/>
					)
				}}
			/>
			
			{ newItemInput ?
				<NewItem 
					style={styles.newItemInput}
					stores={stores}
					save={saveData}
					itemToAdd={itemToAdd}
					storeToAdd={storeToAdd}
					onItemChange={(newItemToAdd) => setItemToAdd(newItemToAdd)}
					onStoreChange={(newStoreToAdd) => setStoreToAdd(newStoreToAdd)}
					onItemSubmit={(newItem, store) => {
						saveData(itemToAdd, storeToAdd);

					}}
					toggle={addItem}/> : null
			}
			
			<View style={styles.footer}>
				<TouchableOpacity 
					onPress={() => addItem()}>
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
