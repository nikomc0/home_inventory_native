import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Checkbox = ({ select, selected }) => {
	return (
		<TouchableOpacity onPress={() => select()}>
			{ selected ? <MaterialCommunityIcons name="checkbox-marked-outline" style={styles.checkbox}/> : <MaterialCommunityIcons name="checkbox-blank-outline" style={styles.checkbox}/>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	checkbox: {
		flex: 1,
		alignSelf: 'center',
		fontSize: 30,
		marginRight: 15,
	},
})

export default Checkbox;
