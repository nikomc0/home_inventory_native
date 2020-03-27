import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity, KeyboardAvoidingView, Modal, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StorePicker from './StorePicker';
import Input from './ItemInput';

const NewItemModal = ({ stores, itemToAdd, storeToAdd, onItemChange, onStoreChange, onItemSubmit, toggle }) => {
	const [picker, showPicker] = useState(false);

	const togglePicker = () => {
		showPicker(!picker);
	}

	return (
				<KeyboardAvoidingView
					behavior='padding'
					enabled
					keyboardVerticalOffset={20}>
					<ScrollView>
					<Modal
						animationType="slide"
						transparent={true}
						presentationStyle="overFullScreen">
						<View style={styles.newItemView}>

									<View>
										<Input placeholder="New Item" value={itemToAdd} method={onItemChange}/>
										<Input placeholder="New Store" value={storeToAdd} method={onStoreChange}/>
									</View>
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

							<View style={styles.storeInput}>	
								<TouchableOpacity
									onPress={() => {
										onItemSubmit(itemToAdd, storeToAdd);
										toggle();
									}}>
									<Text style={styles.submitButton}>Done</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
					</ScrollView>
				</KeyboardAvoidingView>
	)
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create ({
	newItemView: {
		backgroundColor: '#fff',
		marginTop: height * .42,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	storeInput: {
		backgroundColor: '#fff',
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
		margin: 15,
	}
})

export default NewItemModal;
