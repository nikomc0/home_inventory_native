import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StorePicker from './StorePicker';

const NewItem = ({ stores }) => {
	const [picker, showPicker] = useState(false);

	const togglePicker = () => {
		showPicker(!picker);
	}

	return (
		<View style={styles.newItemView}>
			<TextInput style={styles.textInput}/>
			<TouchableOpacity onPress={togglePicker}>
				<MaterialIcons style={styles.storeIcon} name="store"/>
			</TouchableOpacity>
			{ picker ? <StorePicker stores={stores}/> : null }
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
