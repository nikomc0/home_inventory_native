import React, { useContext, useState, useEffect} from 'react';
import { 
	SafeAreaView, 
	StyleSheet, 
	Text, 
	View, 
	SectionList, 
	FlatList, 
	TouchableOpacity, 
	RefreshControl, 
	KeyboardAvoidingView,
	ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
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
	const [refreshing, setRefreshing] = React.useState(false);
	const [animating, setAnimating] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
		getItems();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

	const filterItemsByStatus = (items) => {
		if (!showCompleted) {
			return items.filter(item => {
				if (!item.complete) {
					return item.store_info.store_name; 
				}
			});
		} else {
			return items.filter(item => {
				return item.store_info.store_name;
			});
		}
	}

	function wait(timeout) {
	  return new Promise(resolve => {
	    setTimeout(resolve, timeout);
	  });
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

	// const showCompletedButton =
	// 	<View style={styles.showCompleted}>
	// 		<TouchableOpacity
	// 			onPress={completed}>
	// 			{ showCompleted ? 
	// 				<Text>Hide Completed</Text>
	// 				:
	// 				<Text>Show Completed</Text>
	// 			}
	// 		</TouchableOpacity>
	// 	</View>

const showCompletedButton = 
	showCompleted ? 
		<Button 
		buttonStyle={styles.showCompleted}
		titleStyle={styles.textStyle}
		title="Completed"
		onPress={completed}/>
		: 
		<Button 
		buttonStyle={styles.showCompletedSelected}
		titleStyle={styles.textStyle}
		title="Completed"
		onPress={completed}/>
	
	const listheader = () => {
		if (state.unassigned && state.unassigned.length > 0) {
			return ( 
				<ItemList 
					data={state.unassigned}
					deleteData={deleteUnassignedData}
					onItemChange={(newItemToAdd) => setItemToAdd(newItemToAdd)}
					onStoreChange={(newStoreToAdd) => {
						setStoreToAdd(newStoreToAdd);
					}}
					withDetails={true}
				/> 
			)
		} else {
			return null
		}
	}

	useEffect(() => {
		console.log(state);
		getItems().then(()=>{setAnimating(false)});
	}, []);

  return (
  	<View style={styles.container}>
			{
				animating ? <ActivityIndicator animating={animating} size="large"	/> : null
			}

		  <View style={styles.header}>
			 	{ state.complete && state.complete.length > 0 ? showCompletedButton : null }
		  </View>

			<KeyboardAvoidingView
				behavior="padding"
				style={styles.listStyle}
				keyboardVerticalOffset={0}>
				<SafeAreaView style={styles.sectionList}>
					<SectionList
						style={{height: '100%'}}
						sections={state.storeData}
						keyExtractor={(item, index) => item + index}
						ListHeaderComponent={listheader}
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
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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

HomeScreen.navigationOptions = ({navigation}) => {
	return {
		headerShown: true,
		title: 'Home Inventory',
		headerRight: (
			<TouchableOpacity
  			onPress={()=> navigation.navigate('Settings')}>
  			<MaterialCommunityIcons style={styles.settings} name="settings" size={24}/>
  		</TouchableOpacity>
  	),
	}
}

const styles = StyleSheet.create ({
  container: {
  	flex: 1,
  	flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  header: {},
	listStyle: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
  sectionList: {
		// flex: 1,
  },
  sectionHeader: {
		backgroundColor: '#e6e6e6',
		fontSize: 20,
		textTransform: 'capitalize',
		marginHorizontal: 15,
		padding: 10,
  },
	addItemButton: {
		alignSelf: 'center',
		fontSize: 50,
	},
	showCompleted: {
		alignSelf: 'flex-end',
		backgroundColor: '#303337',
		margin: 5,
		paddingTop: 2,
		paddingBottom: 2
	},
	showCompletedSelected: {
		alignSelf: 'flex-end',
		backgroundColor: '#bbb',
		margin: 5,
		paddingTop: 2,
		paddingBottom: 2
	},
	settings: {
		marginHorizontal: 5,
	},
	textStyle: {
		fontSize: 15
	},
  footer: {
		paddingTop: 10,
		paddingBottom: 25,
	},
});

export default HomeScreen;
