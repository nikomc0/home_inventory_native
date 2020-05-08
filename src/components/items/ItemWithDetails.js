import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Badge, Button } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DefaultItem from './DefaultItem';
import Checkbox from '../Checkbox';
import Input from '../ItemInput';
import ItemQty from '../ItemQty';

const ItemWithDetails = ({item, select, togglePicker, picker, qty, increase, decrease, itemToAdd, onItemChange, submit, storeModal}) => {

	const detailsTemplate = 
		<View style={styles.container}>
			<TouchableOpacity 
				style={styles.storePicker}
				onPress={togglePicker}>
					<MaterialIcons style={styles.storeIcon} name="store"/>
					<Text style={styles.detailsText}>{item.store_info.store_name}</Text>
					{ picker ? storeModal : null }
			</TouchableOpacity>
			<View style={styles.footer}>
				<ItemQty quantity={qty} increase={increase} decrease={decrease}/>
				<Button buttonStyle={styles.buttonStyle} title="Done" type="solid" onPress={submit}/>
			</View>
		</View>

	return (
		<View>
			<DefaultItem item={item} editable={true} itemToAdd={itemToAdd} onItemChange={onItemChange}/>
			{ detailsTemplate }
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	storePicker: {
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 20,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	buttonStyle: {
		backgroundColor: '#52c41a',
		paddingLeft: 20,
		paddingRight: 20
	},
	detailsStyle:{
		paddingTop:15,
	},
	detailsText: {
		alignSelf: 'center',
		color: "#d3d3d3",
		fontSize: 20,
		textTransform: 'capitalize',
	},
	storeIcon: {
		fontSize: 30,
		paddingRight: 10,
		color: '#A9A9A9',
	},
});

export default ItemWithDetails;