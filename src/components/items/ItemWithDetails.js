import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from '../Checkbox';

const ItemWithDetails = ({item, select}) => {
	return (
		<View>
			<View style={styles.items}>
				{ item.complete ? 
				<Checkbox select={select} selected={true}/> 
				:
				<Checkbox select={select} selected={false}/>
				}

				<Input placeholder={item.name} value={itemToAdd} method={onItemChange} />
			</View>
			
			{ detailsTemplate }
		</View>
	)
}

const styles = StyleSheet.create({
});

export default ItemWithDetails;