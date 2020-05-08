import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from '../Checkbox';
import Input from '../ItemInput';

const DefaultItem = ({item, select, editable, itemToAdd, onItemChange}) => {
	return (
		<View style={styles.container}>
			{ item.complete ? 
				<View style={styles.checkbox}><Checkbox select={select} selected={true}/></View> 
				:
				<View style={styles.checkbox}><Checkbox select={select} selected={false}/></View>
			}
			{
				item.qty === 1 ? null 
				: 
				<View 
					style={styles.badge}>
					<Badge 
						value={item.qty}
						badgeStyle={{height:25, width: 25, borderRadius: 15,}}
						textStyle={{fontSize: 15,}} 
						status="success"/>
				</View>
			}
			<View style={styles.text}>
				{
					editable ? 
					<Input placeholder={item.name} value={itemToAdd} method={onItemChange} /> 
					:
					<Text style={styles.itemName}>{item.name}</Text>
				}
			</View>
			<View style={styles.chevron}>
				{
					editable? 
					<MaterialCommunityIcons style={styles.chevronIcon} name='chevron-down'/>
					:
					<MaterialCommunityIcons style={styles.chevronIcon} name='chevron-right'/>					
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkbox: {},
	badge: {
		paddingRight: 10,
	},
	text: {
		flex: 3,
		// backgroundColor: 'skyblue',
	},
	itemName: {
		fontSize: 20,
		textTransform: 'capitalize',
	},
	chevron: {
		// backgroundColor: 'steelblue',
	},
	chevronIcon: {
		fontSize: 20,
		padding: 5,
	}
});

export default DefaultItem;
