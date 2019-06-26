import React, {Component} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

MainScreen=()=>{

    return (
      <View style={styles.container}>
        <Text>WELCOME TO INSUMOS APP</Text>
      </View>
    )
  }


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default MainScreen;
