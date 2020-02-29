import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Item = ({ item }) => {
	const [details, setDetails] = useState(false);
	const [selected, setSelected] = useState(false);

	const detailsTemplate = <View>
			<Text style={styles.detailsStyle}>store: {item.store}</Text>
			<Text style={styles.detailsStyle}>qty: {item.qty}</Text>
		</View>

	function showDetails(){
		setDetails(!details);
	}

	function select(){
		setSelected(!selected);
	}

	return (
		<View style={styles.listItems}>
			<TouchableOpacity
				onPress={() => showDetails()}
			>
				<View style={styles.itemCard}>
					<View style={styles.items}>
						<TouchableOpacity onPress={() => select()}>
							{ selected ? <MaterialCommunityIcons name="checkbox-marked-outline" style={styles.checkbox}/> : <MaterialCommunityIcons name="checkbox-blank-outline" style={styles.checkbox}/>}
						</TouchableOpacity>
						<Text style={styles.itemStyle}>{item.qty}</Text>
						<Text style={styles.itemStyle}>{item.item}</Text>
					</View>
					{ details ? <View>{detailsTemplate}</View> : null }
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	itemCard: {
		backgroundColor: '#fff',
		padding: 10,
		marginTop: 10,
		marginHorizontal: 15,
	},
	items: {
		flexDirection: 'row',
		alignItems: 'center'
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
	detailsStyle: {
		color: "#858585",
		fontSize: 18,
	}
});

export default Item;