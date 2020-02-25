import React from 'react'
import { StyleSheet, Text, View, RefreshControl } from 'react-native'
import ItemList from '../components/ItemList';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ItemList />
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
