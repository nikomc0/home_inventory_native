import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const StorePicker = ({ stores, toggle, setStore }) => {
	const [item, setItem] = useState('');

	return (
			<Picker style={styles.pickerStyle}
				selectedValue={item}
				onValueChange={(itemValue, itemIndex) => {
					setStore(itemValue);
					toggle();
				}}>
				{stores.map((store, index) =>{
					return (
						<Picker.Item 
							style={styles.pickerItem} 
							key={store.id} 
							label={store.name} 
							value={store.name}/>
					)
				})}
			</Picker>
	)
}

const styles = StyleSheet.create ({
	pickerStyle: {
	},
	pickerItem: {
	}
})

export default StorePicker;