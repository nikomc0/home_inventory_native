import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Checkbox from './Checkbox';

const Item = ({ item, onSwipeLeft, onSwipeRight, deleteItem }) => {
	const [details, setDetails] = useState(false);
	const [selected, setSelected] = useState(false);
	const [itemToDelete, setItemToDelete] = useState('');

	const detailsTemplate = <View>
			<Text style={styles.detailsStyle}>store: {item.store.store}</Text>
			<Text style={styles.detailsStyle}>qty: {item.qty}</Text>
		</View>

	function showDetails(){
		setDetails(!details);
	}

	function select(){
		setSelected(!selected);
	}

	const getItem = (item) => {
		setItemToDelete(item);
	}

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
					deleteItem(item);
					itemToDelete.close();
				}}>
				<View>
					<Animated.Text style={[styles.rightActionText, {transform: [{ scale }]}]}>Delete</Animated.Text>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<Swipeable
			renderRightActions={RightActions} ref={getItem}>
			<View style={styles.itemCard}>
				<TouchableOpacity
					onPress={() => showDetails()}>
						<View style={styles.items}>
							<Checkbox select={select} selected={selected}/>
							<Text style={styles.itemStyle}>{item.qty}</Text>
							<Text style={styles.itemStyle}>{item.item}</Text>
						</View>
						{ details ? <View>{detailsTemplate}</View> : null }
				</TouchableOpacity>
			</View>
		</Swipeable>
	)
}

const styles = StyleSheet.create({
	itemCard: {
		backgroundColor: '#fff',
		padding: 10,
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
	detailsStyle: {
		color: "#858585",
		fontSize: 18,
	},
	rightAction: {
		backgroundColor: "red",
		justifyContent: 'center'
	},
	rightActionText: {
		color: "#fff",
		fontWeight: "600",
		paddingRight: 20,
		paddingLeft: 20,
		fontSize: 18,
		alignSelf: 'center',
	}
});

export default Item;