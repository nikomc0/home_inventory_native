import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const ItemQty = ({quantity, increase, decrease}) => {

	return (
		<View style={styles.container}>
			<View>
				<TouchableOpacity
					onPress={decrease}>
					<MaterialCommunityIcons style={styles.icon} name='chevron-down' />
				</TouchableOpacity>
			</View>
			<View style={styles.quantity}>
				<Text style={styles.text}> { quantity } </Text>
			</View>
			<View>
				<TouchableOpacity
					onPress={increase}>
					<MaterialCommunityIcons style={styles.icon} name='chevron-up' />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	quantity: {
		marginHorizontal: 15,
	},
	icon: {
		fontSize: 30,
	},
	text: {
		fontSize: 20,
	}
})
export default ItemQty;
