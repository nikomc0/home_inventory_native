import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ({ placeholder, value, method, item, onEndEditing }) => {
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
				autoCapitalize='words'
				placeholder={holder}
				value={value}
				onChangeText={method}
				onEndEditing={onEndEditing}/>
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