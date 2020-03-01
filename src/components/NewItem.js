import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StorePicker from './StorePicker';

const NewItem = ({ stores, save, itemToAdd, onItemChange, onItemSubmit, toggle }) => {
	const [item, setItem] = useState('');
	const [store, setStore] = useState('');
	const [picker, showPicker] = useState(false);

	const togglePicker = () => {
		showPicker(!picker);
	}

	return (
		<View style={styles.newItemView}>
			<TextInput style={styles.textInput} placeholder="Add Item"
				autoCapitalize="none"
				autoCorrect={true}
				value={itemToAdd}
				onChangeText={onItemChange}
				onEndEditing={() => {
					onItemSubmit(itemToAdd, store);
					toggle();
				}}/>
			<TouchableOpacity onPress={togglePicker}>
				<MaterialIcons style={styles.storeIcon} name="store"/>
			{ picker ? <StorePicker stores={stores} setStore={selectedStore => {
				setStore(selectedStore);
			}} toggle={togglePicker}/> : null }
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create ({
	newItemView: {
		backgroundColor: '#fff',
	},
	textInput: {
		fontSize: 20,
		padding: 10,
	},
	storeIcon: {
		fontSize: 30,
		color: '#A9A9A9',
	},
})

export default NewItem;
