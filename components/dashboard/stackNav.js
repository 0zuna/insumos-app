import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from  'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "./MainScreen";
//Proveedor
import NewProveedor from "./views/proveedor/NewProveedor";
import ShowProveedor from "./views/proveedor/ShowProveedor";
//producto
import NewProducto from "./views/producto/NewProducto";
import ShowProducto from "./views/producto/ShowProducto";
//entrada
import NewEntrada from "./views/entrada/NewEntrada";
//salida
import NewSalida from "./views/salida/NewSalida";
//balance
import NewBalance from "./views/balance/NewBalance";

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
	NewProducto: {
		screen: NewProducto,
		navigationOptions: ({navigation}) => ({title: "Nuevo Producto"})
	},
	ShowProducto: {
		screen: ShowProducto,
		navigationOptions: ({navigation}) => ({title: "Mis Productos"})
	},
	NewEntrada: {
		screen: NewEntrada,
		navigationOptions: ({navigation}) => ({title: "Entrada de productos"})
	},
	NewSalida: {
		screen: NewSalida,
		navigationOptions: ({navigation}) => ({title: "Salida de productos"})
	},
	NewBalance: {
		screen: NewBalance,
		navigationOptions: ({navigation}) => ({title: "Balance"})
	},
});

export default stackNav;
