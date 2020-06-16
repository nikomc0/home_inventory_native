import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ({ value, method}) => {
	const [val, onChangeText] = useState(value);

	return (
		<View style={styles.items}>
			<TextInput 
				style={styles.itemStyle}
				autoCapitalize='words'
				value={value}
				onChangeText={method}/>
		</View>
	)
}

const styles = StyleSheet.create({
	items: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemStyle: {
		flex: 1,
		fontSize: 20,
		textTransform: 'capitalize',
	},
})

export default Input;