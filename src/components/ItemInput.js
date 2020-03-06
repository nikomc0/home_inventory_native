import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ({ placeholder, value, method, item }) => {
	const [holder, setHolder] = useState("");

	const getPlaceholder = () => {
		if (item) {
			setHolder(item.item);
		} else {
			setHolder(placeholder);
		}
	}

	useEffect(() => {
		getPlaceholder();
	}, []);

	return (
		<View style={styles.items}>
			<TextInput 
				style={styles.itemStyle}
				placeholder={holder}
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
		fontSize: 20,
		textTransform: 'capitalize',
		padding: 10,
	},
})

export default Input;