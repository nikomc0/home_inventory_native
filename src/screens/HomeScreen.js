import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
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
	const [errorMessage, setErrorMessage] = useState("");
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
   	getData();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

	function wait(timeout) {
	  return new Promise(resolve => {
	    setTimeout(resolve, timeout);
	  });
	}

	const filterItemsByStore = (store) => {
		return items.items.filter(item => {
			return item.store === store; 
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
			const response = await hi.get('/items', {
				// Not yet built in the HI API.
				// params: {

				// }
			});
			setItems(response.data);
			setStores(response.data.stores);
		} catch (error) {
			setErrorMessage('Something went wrong')
		}
	};

	const saveData = async (item, store) => {
		try {
			const response = await hi.post('/items', {
				item: item,
				store: store
			});
		} catch (error) {
			setErrorMessage('Failed to Save Item')
		}
	}

	const deleteData = async (item) => {
		try {
			console.log(`Delete ${item.item} at ${item.store}`);
		} catch (error){
			setErrorMessage('Failed to Delete Item')
		}
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
				keyExtractor={(store) => store.id}
				renderItem={({ item }) => {
					return (
						<ItemList 
							results={filterItemsByStore(item.store)} 
							searchAPI={getData} 
							deleteData={deleteData}
							data={items} 
							store={item.store}
							error={errorMessage} 
							/>
					)
				}}
			/>
			
			{ newItemInput ? <NewItem 
					stores={stores}
					save={saveData}
					itemToAdd={itemToAdd}
					onItemChange={(newItemToAdd) => setItemToAdd(newItemToAdd)}
					onItemSubmit={(newItem, store) => saveData(newItem, store)}
					toggle={addItem}
				/> : null
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
  },
	listStyle: {

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
