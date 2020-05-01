import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spacer from './Spacer';

const Link = ({ navigation, text, routeName }) => {
	return (
		<View>
			<Spacer>
				<TouchableOpacity
					onPress={() => navigation.navigate(routeName)}>
					<Text style={styles.link}>{text}</Text>
				</TouchableOpacity>
			</Spacer>
		</View>
	)
}

const styles = StyleSheet.create({
	link: {
		color: 'blue',
	}
});

export default withNavigation(Link);
