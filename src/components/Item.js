import React, { useContext, useState, useEffect } from 'react';
import { 
	View, 
	TextInput, 
	StyleSheet, 
	TouchableOpacity, 
	TouchableNativeFeedback,
	Animated, 
	FlatList, 
	Dimensions, 
	Modal,
	Alert } from 'react-native';
import { Text, ListItem, Badge } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Checkbox from './Checkbox';
import Input from './ItemInput';
import ItemQty from './ItemQty';
import DefaultItem from './items/DefaultItem';
import ItemWithDetails from './items/ItemWithDetails';
import { Context as ItemContext } from '../context/ItemContext';

const Item = ({ item, data, setSelectedItem, onSwipeLeft, onSwipeRight, withDetails, onLongPress }) => {
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
	const [adjustQty, setAdjustQty] = useState(false);
	const [qty, setQty] = useState(item.qty);

	const [store, setStore] = useState(item);

	const togglePicker = () => {
		showPicker(!picker);
	}

	function showDetails() {
		setDetails(!details);
	}

	function showAdjustQty() {
		setAdjustQty(!adjustQty);
	}

	function select() {
		setSelected(!selected);
		itemStyle('select');
		item.complete = !item.complete;
		// editItem(item).then(getItems);
		editItem(item);
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
			item.store_info = {id:'', store_name: newStore};
		else {
			item.store_id.$oid = newStore.id;
			item.store_info = {id: newStore.id, store_name: newStore.name};	
		}
	}

	const submit = () => {
		if (item.store_info.name === "Unassigned") {
			return alert('Please choose a store.');
		}
		
		if (item.id === '1') {
			setDetails(false);
			itemStyle();
			addItem(item.name, item.store_info.store_name, qty).then(() => getItems());
		} else {
			item.qty = qty;
			
			setDetails(false);
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

	function increase() {
		setQty(qty + 1);
	}

	function decrease() {
		if (qty > 1) {
			setQty(qty - 1);
		}
	}

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
											togglePicker();
											updateStore(item);
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
					<Animated.Text style={[styles.rightActionText, {transform: [{ scale }]}]}>
						<MaterialCommunityIcons style={styles.trashIcon} name="trash-can-outline"/>
					</Animated.Text>
				</View>
			</TouchableOpacity>
		)
	}

	const activeItem = 
		<View 
			style={item.complete ? styles.itemCardSelected : itemCardStyle}
			details={details}>
			<TouchableOpacity
				onPress={() => {
					itemStyle('fancy_item');
					showDetails();
				}}
				onLongPress={onLongPress}>
				{ 
					details || withDetails ? 
					<ItemWithDetails 
						item={item} 
						select={select} 
						togglePicker={togglePicker} 
						picker={picker}
						qty={qty}
						increase={increase}
						decrease={decrease}
						itemToAdd={itemToAdd}
						onItemChange={onItemChange}
						submit={submit}
						storeModal={storeModal}/> 
					: 
					<DefaultItem item={item} select={select}/>
				}
			</TouchableOpacity>
		</View>

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
		padding: 5,
	},
	storeModalList: {
		// marginHorizontal: 15,
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
		flex: 1,
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
	rightAction: {
		backgroundColor: "red",
		justifyContent: 'center',
		marginBottom: 2,
	},
	rightActionText: {
		paddingRight: 10,
		paddingLeft: 10,
	},

	trashIcon: {
		fontSize: 45,
		color: '#fff',
	},
	adjustQty: {
		flexDirection: 'row',
	}
});

export default Item;  