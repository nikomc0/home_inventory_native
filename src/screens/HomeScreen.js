import React, { useContext, useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, SectionList, FlatList, TouchableOpacity, RefreshControl, KeyboardAvoidingView } from 'react-native';
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

	const filterItemsByStatus = (items) => {
		if (!showCompleted) {
			return items.filter(item => {
				if (!item.complete) {
					return item.store_info.name; 
				}
			});
		} else {
			return items.filter(item => {
				return item.store_info.name;
			});
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
		  <View style={styles.header}>
			 	{ state.complete && state.complete.length > 0 ? showCompletedButton : null }
		  </View>
			<KeyboardAvoidingView
				behavior="padding"
				style={styles.listStyle}>
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

				<SafeAreaView style={styles.sectionList}>	
					<SectionList
						sections={state.storeData}
						keyExtractor={(item, index) => item + index}
						renderItem={({ item }) => {
							return (
								<ItemList 
									data={filterItemsByStatus(item.items)}
									deleteData={deleteData}
									setSelectedItem={setSelectedItem}
								/>
							)
						}}
						renderSectionHeader={({ section: { title } }) => (
							<Text style={styles.sectionHeader}>{title}</Text>
						)}
					/>
				</SafeAreaView>
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
  	flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {},
	listStyle: {
		flex: 3,
	},
  sectionList: {
		flex: 1,
  },
  sectionHeader: {
		backgroundColor: '#e6e6e6',
		fontSize: 20,
		textTransform: 'capitalize',
		marginHorizontal: 15,
		padding: 10,
  },
  footer: {
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
