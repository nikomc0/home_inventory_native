import React, { useContext, useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl, ScrollView, KeyboardAvoidingView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import Item from '../components/Item';
import NewItemModal from '../components/NewItemModal';
import hi from '../api/hi';
import { Context as ItemContext } from '../context/ItemContext';
import { AppState } from 'react-native';

const HomeScreen = ({ navigation }) => {
	const {state, getItems, addItem, editItem, newItem} = useContext(ItemContext);
	const [errorMessage, setErrorMessage] = useState("");

	const [newItemInput, showNewItemInput] = useState(false);
	const [showCompleted, setShowCompleted] = useState(false);

	const filterStoresByCompleted = () => {
		if (state.stores){
			return state.stores.filter((store) => {
				return onlyNotCompleted(store.items);
			})
		}
	}

	const filterItemsByStore = (store) => {
		if (!showCompleted) {
			return state.items.filter(item => {
				if (!item.complete) {
					return item.store_info.name === store; 
				}
			});
		} else {
			return state.items.filter(item => {
				return item.store_info.name === store;
			});
		}
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
			getItems();
			// onRefresh();
		} catch (error){
			setErrorMessage('Failed to Delete Item')
		}
	}

	// ToDo: Ability to Delete unassigned Items.
	const deleteUnassignedData = (item) => {
		console.log(item);
	}

	const clearState = () => {
		setItemToAdd("");
		setStoreToAdd("");
	}

	const setSelectedItem = (item) => {
		item.complete = !item.complete;
		return editItem(item);
	}

	const completed = () => {
		setShowCompleted(!showCompleted);
	}

	const showCompletedButton =
		<View style={styles.showCompleted}>
			<TouchableOpacity
				onPress={completed}>
				{ showCompleted ? 
					<Text>Hide Completed</Text>
					:
					<Text>Show Completed</Text>
				}
			</TouchableOpacity>
		</View>

	useEffect(() => {
		getItems();
	}, []);

  return (
  	<View style={styles.container}>
		<KeyboardAvoidingView
			behavior="position">
  		{ state.complete && state.complete.length > 0 ? showCompletedButton : null }

			{ state.unassigned && state.unassigned.length > 0 ? 
				<ItemList 
					data={state.unassigned}
					deleteData={deleteUnassignedData}
					onItemChange={(newItemToAdd) => setItemToAdd(newItemToAdd)}
					onStoreChange={(newStoreToAdd) => {
						setStoreToAdd(newStoreToAdd);
					}}
					withDetails={true}
				/> : null
			}
			<FlatList
				style={styles.listStyle} 
				data={state.stores}
				keyExtractor={ store => store.id}
				renderItem={({ item }) => {
					return (
						<ItemList 
							data={filterItemsByStore(item.name)}  
							deleteData={deleteData}
							setSelectedItem={setSelectedItem}
							store={item.name}
						/>
					)
				}}
			/>
			
    </KeyboardAvoidingView>
			<View style={styles.footer}>
				<TouchableOpacity 
					onPress={() => {
						newItem();
					}}>
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
    justifyContent: 'space-between',
  },
	// newItemInput: {
	// 	flex: 2,
	// },
  footer: {
  	// flex: 2,
		paddingTop: 10,
		paddingBottom: 25,
	},
	addItemButton: {
		alignSelf: 'center',
		fontSize: 50,
	},
	showCompleted: {
		alignSelf: 'flex-end',
		padding: 5,
		backgroundColor: '#a9a9a9',
	},
});

export default HomeScreen;
