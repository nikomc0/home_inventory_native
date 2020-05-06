import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from '../Checkbox';

const DefaultItem = ({item, select}) => {
	return (
		<View style={styles.container}>
			{ item.complete ? 
				<View style={styles.checkbox}><Checkbox select={select} selected={true}/></View> 
				:
				<View style={styles.checkbox}><Checkbox select={select} selected={false}/></View>
			}
			{
				item.qty === 1 ? null : <View style={styles.badge}><Badge value={item.qty} status="success"/></View>
			}
			<View style={styles.text}>
				<Text style={styles.itemName}>{item.name}</Text>
			</View>
			<View style={styles.chevron}>
				<MaterialCommunityIcons style={styles.chevronIcon} name='chevron-right'/>
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
	badge: {},
	text: {
		flex: 3,
	},
	itemName: {
		fontSize: 20,
		textTransform: 'capitalize',
	},
	chevron: {},
	chevronIcon: {
		fontSize: 20,
	}
});

export default DefaultItem;
