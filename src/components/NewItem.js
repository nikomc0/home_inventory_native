import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StorePicker from './StorePicker';
import Input from './ItemInput';

const NewItem = ({ 
	stores, save, itemToAdd, storeToAdd, onItemChange, onStoreChange, onItemSubmit, toggle }) => {
	const [picker, showPicker] = useState(false);

	const togglePicker = () => {
		showPicker(!picker);
	}

	return (
		<KeyboardAvoidingView
			behavior='padding'
			enabled
			keyboardVerticalOffset={30}>
			<ScrollView>
				<View style={styles.newItemView}>
					<Input placeholder="New Item" value={itemToAdd} method={onItemChange}/>
					<Input placeholder="New Store" value={storeToAdd} method={onStoreChange}/>
				</View>
				<View style={styles.storeInput}>	
					<TouchableOpacity onPress={togglePicker}>
						<MaterialIcons style={styles.storeIcon} name="store"/>
							{ picker ? <StorePicker 
								style={styles.storePicker}
								stores={stores} 
								setStore={selectedStore => {
									onStoreChange(selectedStore);
									}} 
								toggle={togglePicker}
								/> : null }
					</TouchableOpacity>
				
					<TouchableOpacity
						onPress={() => {
							onItemSubmit(itemToAdd, storeToAdd);
							toggle();
						}}>
						<Text style={styles.submitButton}>Done</Text>
					</TouchableOpacity>
				</View>
				</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create ({
	newItemView: {
		backgroundColor: '#fff',
	},
	storeInput: {
	},
	textInput: {
		fontSize: 20,
		padding: 10,
	},
	storeIcon: {
		fontSize: 30,
		paddingLeft: 5,
		color: '#A9A9A9',
	},
	storePicker: {
	},
	submitButton: {
		alignSelf: 'flex-end',
		fontSize: 20,
		marginHorizontal: 15,
	}
})

export default NewItem;
