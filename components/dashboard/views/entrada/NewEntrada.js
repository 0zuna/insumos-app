import React, {Component, useState, useContext} from 'react';
import { Text, View, Alert } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../../UserContext';



NewEntrada= () =>{

	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [entrada, setEntrada] = useState({});

	const register=()=>{
		axi.post('/api/auth/entrada',entrada)
		.then((response)=>{
			setEntrada({})
			nombre=response.data.producto.nombre
			descripcion=response.data.producto.descripcion
			count=response.data.entrada.cantidad
			Alert.alert("Entrada",`Se a registrado entrada para:\n${nombre} x${count} \ndescripcion:${descripcion}`)
		})
		.catch((response)=>{
			Alert.alert("Error","Se a producido un error porfavor verifique sus datos y vuelva a intentarlo n_n")
		})
	}
	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<View style={{padding:20}}>
				<Input label="Codigo" onChangeText={(t)=>setEntrada({...entrada, codigo:t})} value={entrada.codigo} placeholder='Codigo de producto' leftIcon={<Icon name='barcode' size={24}/>}/>
				<Input label="Cantidad" onChangeText={(t)=>setEntrada({...entrada, cantidad:t})} value={entrada.cantidad} placeholder='Cantidad' leftIcon={<Icon name='shopping-cart' size={24}/>}/>
				<Input label="Factura" onChangeText={(t)=>setEntrada({...entrada, ref_factura:t})} value={entrada.ref_factura} placeholder='Referencia de factura' leftIcon={<Icon name='file' size={24} color='black'/>}/>
				<View style={{marginTop:20}}>
				<Button onPress={register} title="Registrar entrada" type="clear"/>
				</View>
			</View>
		</ThemeProvider>
	);
}

export default NewEntrada;
