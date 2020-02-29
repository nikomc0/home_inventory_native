import React from 'react';
import { View, Text, Picker } from 'react-native';

const StorePicker = ({ stores }) => {
	return (
		<View>
			<Picker>
				{stores.map((store, index) =>{
					return (<Picker.Item key={store.id} label={store.store} value={store.store}/>)
				})}
			</Picker>
		</View>
	)
}

export default StorePicker;