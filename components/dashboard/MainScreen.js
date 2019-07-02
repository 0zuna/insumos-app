import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import {NavigationActions} from 'react-navigation';

MainScreen=(props)=>{

	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		props.navigation.dispatch(navigateAction);
	}

	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<View style={styles.container}>
				<Text>WELCOME TO INSUMOS APP</Text>
			</View>
			<Button onPress={navigateToScreen('NewEntrada')} title="Entradas" type="clear"/>
			<Button onPress={navigateToScreen('NewSalida')} title="Salidas" type="clear"/>
		</ThemeProvider>
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
