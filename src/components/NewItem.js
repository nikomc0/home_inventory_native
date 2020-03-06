import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
import StorePicker from './StorePicker';

const NewItem = ({ 
	stores, save, itemToAdd, storeToAdd, onItemChange, onStoreChange, onItemSubmit, toggle }) => {
	const [item, setItem] = useState('');
	const [store, setStore] = useState('');
	const [picker, showPicker] = useState(false);

	const togglePicker = () => {
		showPicker(!picker);
	}

	return (
		<KeyboardAvoidingView
			style={{ }}
			behavior='padding'
			enabled
			keyboardVerticalOffset={30}>
			<ScrollView>
				<View style={styles.newItemView}>
					<TextInput style={styles.textInput} placeholder="Add Item"
						autoCapitalize="none"
						autoCorrect={true}
						value={itemToAdd}
						onChangeText={onItemChange}/>
					<TextInput style={styles.textInput}
						placeholder="New Store"
						autoCapitalize="none"
						value={storeToAdd}
						onChangeText={onStoreChange}/>
				</View>
				<View style={styles.storeInput}>	
					<TouchableOpacity onPress={togglePicker}>
						<MaterialIcons style={styles.storeIcon} name="store"/>
							{ picker ? <StorePicker 
								style={styles.storePicker}
								stores={stores} 
								setStore={selectedStore => {
									setStore(selectedStore);
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
	}
})

export default NewItem;
