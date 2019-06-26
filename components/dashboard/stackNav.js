import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from  'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "./MainScreen";
import NewProveedor from "./views/proveedor/NewProveedor";
import ShowProveedor from "./views/proveedor/ShowProveedor";

const stackNav = createStackNavigator({
	Main : {
		screen: MainScreen,
		navigationOptions: ({navigation}) => ({
			title: "Insumos App",
			headerLeft:(
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<View style={{paddingLeft: 15}}>
						<IOSIcon name="ios-menu" size={30} />
					</View>
				</TouchableOpacity>
			),
		})
	},
	NewProveedor: {
		screen: NewProveedor,
		navigationOptions: ({navigation}) => ({title: "Nuevo Proveedor"})
	},
	ShowProveedor: {
		screen: ShowProveedor,
		navigationOptions: ({navigation}) => ({title: "Mis Proveedores"})
	},
});

export default stackNav;
