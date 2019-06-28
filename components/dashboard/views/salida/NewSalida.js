import React, {Component, useState, useContext} from 'react';
import { Text, View, Alert } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../../UserContext';



NewSalida = () =>{

	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [salida, setSalida] = useState({});

	const register=()=>{
		axi.post('/api/auth/salida',salida)
		.then((response)=>{
			setSalida({})
			nombre=response.data.producto.nombre
			descripcion=response.data.producto.descripcion
			count=response.data.salida.cantidad
			Alert.alert("Salida",`Se a registrado salida para:\n${nombre} x${count} \ndescripcion:${descripcion}`)
		})
		.catch((response)=>{
			Alert.alert("Error","Se a producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}
	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<View style={{padding:20}}>
				<Input label="Codigo" onChangeText={(t)=>setSalida({...salida, codigo:t})} value={salida.codigo} placeholder='Codigo de producto' leftIcon={<Icon name='barcode' size={24}/>}/>
				<Input label="Cantidad" onChangeText={(t)=>setSalida({...salida, cantidad:t})} value={salida.cantidad} placeholder='Cantidad' leftIcon={<Icon name='shopping-cart' size={24}/>}/>
				<View style={{marginTop:20}}>
				<Button onPress={register} title="Registrar salida" type="clear"/>
				</View>
			</View>
		</ThemeProvider>
	);
}

export default NewSalida;
