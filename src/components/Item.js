import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, FlatList, Dimensions, Modal } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Checkbox from './Checkbox';
import Input from './ItemInput';
import { Context as ItemContext } from '../context/ItemContext';

const Item = ({ item, setSelectedItem, onSwipeLeft, onSwipeRight, withDetails, }) => {
	const { state, getItems, addItem, editItem, deleteItem } = useContext(ItemContext);
	const [picker, showPicker] = useState(false);

	const [itemToAdd, setItemToAdd] = useState("");
	const [storeToAdd, setStoreToAdd] = useState("");
	const [newStore, setNewStore] = useState(false);
	const [show, setShow] = useState(true);
	const [details, setDetails] = useState(false);
	const [selected, setSelected] = useState(false);
	const [itemCardStyle, setItemCardStyle] = useState(styles.itemCard);
	const [itemToDelete, setItemToDelete] = useState('');

	const [store, setStore] = useState(item);

	const togglePicker = () => {
		showPicker(!picker);
	}

	function showDetails() {
		setDetails(!details);
	}

	function select() {
		setSelected(!selected);
		itemStyle('select');
		item.complete = !item.complete;
		editItem(item).then(getItems);
	}

	const onItemChange = (newItemToAdd) => {
		setItemToAdd(newItemToAdd);
		item.name = newItemToAdd;
	}

	const onStoreChange = (newStoreToAdd) => {
		setStoreToAdd(newStoreToAdd);
	}

	const getItem = (item) => {
		setItemToDelete(item);
	}

	const updateStore = (newStore) => {
		if (typeof newStore === 'string')
			item.store_info = {id:'', name: newStore};
		else {
			item.store_info = {id: newStore.id, name: newStore.name};	
		}
	}

	const submit = () => {
		if (item.id === '1') {
			setDetails(false);
			itemStyle();
			addItem(item.name, item.store_info.name).then(() => getItems());
		} else {
			setDetails(false);
			console.log('Send to be edited');
			editItem(item).then(getItems);
			setDetails(false);
			itemStyle();
		}
	}

	function itemStyle(source) {
		switch (source) {
			case 'select':
				if (itemCardStyle === styles.itemCardSelected) {
					setItemCardStyle(styles.itemCard)
				} else {
					setItemCardStyle(styles.itemCardSelected);
				}
			case 'fancy_item':
				if (itemCardStyle === styles.fancyItem) {
					setItemCardStyle(styles.itemCard);
				} else {
					setItemCardStyle(styles.fancyItem);
				}
			default:
				setItemCardStyle(styles.itemCard);
		}
	}

	const showNewStore = () => {
		setNewStore(!newStore);
	};

	const storeModal = 
		<Modal
			animationType="slide"
			transparent={true}
			presentationStyle="overFullScreen">
			<View style={styles.storeModal}>
				<View style={styles.storeModalHeader}>
					<Text style={styles.storeModalHeaderTitle}>Stores</Text>
				</View>
				<View style={styles.storeModalInner}>
					<View style={styles.storeModalList}>
						<FlatList 
							data={state.stores}
							keyExtractor={store => store.id}
							renderItem={({ item }) => {
								return (
									<TouchableOpacity 
										onPress={() => {
											updateStore(item);
											togglePicker();
										}}>
										<Text style={styles.storeModalText}>{item.name}</Text>
									</TouchableOpacity>
								)
							}}
						/>
						{ newStore ? <Input placeholder="New Store" method={onStoreChange} onEndEditing={()=>{togglePicker(); updateStore(storeToAdd)}}/> : null }
					</View>
					<View style={styles.storeModalActionRow}>
						<View>
							<TouchableOpacity
								onPress={showNewStore}>
								<Text style={styles.storeModalText}>New Store</Text>
							</TouchableOpacity>
						</View>
						<View>
							<TouchableOpacity 
								onPress={() => {
									togglePicker();
								}}>
								<Text style={styles.storeModalText}>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</Modal>

	const detailsTemplate = 
		<View style={styles.detailsStyle}>
			<View>
				<Text style={styles.detailsText}>qty: {item.qty}</Text>
				<Text style={styles.detailsText}>store: {item.store_info.store_name}</Text>
				<TouchableOpacity 
					style={styles.storePicker}
					onPress={togglePicker}>
						<MaterialIcons style={styles.storeIcon} name="store"/>
							{ picker ? storeModal : null }
				</TouchableOpacity>
			</View>
			<View
				style={{alignSelf: 'flex-end'}}>
				<TouchableOpacity
					onPress={() => {
						submit();
					}}>
					<Text style={styles.detailsSubmitText}>Done</Text>
				</TouchableOpacity>
			</View>
		</View>

	const emptyItem = <View></View>

	const RightActions = (progress, dragX, ref) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [1, 0],
			extrapolate: 'clamp'
		})
		
		return (
			<TouchableOpacity 
				style={styles.rightAction} 
				onPress={() => {
					deleteItem(item).then(() => getItems());
					itemToDelete.close();
				}}>
				<View>
					<Animated.Text style={[styles.rightActionText, {transform: [{ scale }]}]}>Delete</Animated.Text>
				</View>
			</TouchableOpacity>
		)
	}

	const itemWithDetails = 
		<View>
			<View style={styles.items}>
				{ item.complete ? 
					<Checkbox select={select} selected={true}/> 
					:
					<Checkbox select={select} selected={false}/>
				}
				<Text style={styles.itemStyle}>{item.qty}</Text>
				<Input placeholder={item.name} value={itemToAdd} method={onItemChange} />
			</View>
			{ detailsTemplate }
		</View>;

	const defaultItem = 
		<View style={styles.items}>
			{ item.complete ? 
				<Checkbox select={select} selected={true}/> 
				:
				<Checkbox select={select} selected={false}/>
			}
			{
				item.qty === 1 ? null :
				<Text style={styles.itemStyle}>{item.qty}</Text>
			}
			<Text style={styles.itemStyle}>{item.name}</Text>
		</View>

	const activeItem = 
		<View 
			style={item.complete ? styles.itemCardSelected : itemCardStyle}
			details={details}>
			<TouchableOpacity
				onPress={() => {
					itemStyle('fancy_item');
					showDetails();
				}}>
				{ details || withDetails ? itemWithDetails : defaultItem }
			</TouchableOpacity>
		</View>

	// TO DO: Confirm safe to remove.
	// const activeItemWithDetails = 
	// 	<View 
	// 		style={itemCardStyle}
	// 		details={details}>
	// 		<TouchableOpacity
	// 			onPress={() => {
	// 				itemStyle('fancy_item');
	// 				showDetails();
	// 			}}>
	// 				<View style={styles.items}>
	// 					<Checkbox select={select} selected={selected}/>
	// 					<Text style={styles.itemStyle}>{item.qty}</Text>
	// 					<Input placeholder={item.name} value={itemToAdd} method={onItemChange} />
	// 				</View>
	// 				<View>{detailsTemplate}</View>
	// 		</TouchableOpacity>
	// 	</View>

	// useEffect(() => {
	// 	console.log(selected);
	// }, []);

	return (
		<Swipeable 
			style={styles.mainItem}
			renderRightActions={RightActions} 
			ref={getItem}>	
			{ activeItem }
		</Swipeable>
	)
}
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
	mainItem: {
		display: 'none',
	},
	storeModal: {
		flex: 1, 
		backgroundColor: '#fff',
		height: height / 2,
		marginTop: height * .25,
		marginBottom: height * .25,
		marginHorizontal: 20,
		padding: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	storeModalHeader: {
		flex: 0, 
		flexDirection: 'row',
		justifyContent: 'center',
		// marginBottom: 20,
	},
	storeModalHeaderTitle:{
		fontSize: 20,
		fontWeight: '500',
	},
	storeModalInner: {
		flex: 2, 
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	storeModalText: {
		fontSize: 20,
		textTransform: 'capitalize',
	},
	storeModalList: {
		marginHorizontal: 15,
	},
	storeModalActionRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	itemCard: {
		backgroundColor: '#fff',
		padding: 10,
		marginBottom: 2,
	},
	itemCardSelected: {
		backgroundColor: '#e6e6e6',
		padding: 10,
	},
	fancyItem: {
		backgroundColor: '#fff',
		padding: 10,
		margin: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	items: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkbox: {
		flex: 1,
		alignSelf: 'center',
		fontSize: 30,
		marginRight: 15,
	},
	itemStyle: {
		marginHorizontal: 5,
		fontSize: 20,
		textTransform: 'capitalize',
	},
	itemInputStyle: {
		// flex: 1,
		backgroundColor: "#A9A9A9",
	},
	detailsStyle:{
		paddingTop:15,
	},
	detailsText: {
		color: "#d3d3d3",
		fontSize: 18,
		textTransform: 'capitalize',
	},
	detailsSubmitText: {
		fontSize: 18,
	},
	rightAction: {
		backgroundColor: "red",
		justifyContent: 'center',
		marginTop: 2,
		marginBottom: 2,
	},
	rightActionText: {
		color: "#fff",
		fontWeight: "600",
		paddingRight: 20,
		paddingLeft: 20,
		fontSize: 18,
		alignSelf: 'center',
	},
	storeIcon: {
		fontSize: 30,
		paddingTop: 15,
		color: '#A9A9A9',
	},
});

export default Item;  