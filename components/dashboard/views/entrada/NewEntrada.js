import React, {Component, useState, useContext, useEffect} from 'react';
import { View, Alert, TouchableOpacity, Modal } from 'react-native';
import { ThemeProvider, Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../../UserContext';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';



NewEntrada= () =>{

	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [entrada, setEntrada] = useState({});
	const [permiso, setPermiso] = useState(null);
	const [modalVisible,setModalVisible]=useState(false)

	useEffect(()=>{
		async function fetchData() {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			setPermiso(status === 'granted')
		}
		fetchData()
	},[])

	const register=()=>{
		axi.post('/api/auth/entrada',entrada)
		.then((response)=>{
			setEntrada({})
			nombre=response.data.producto.nombre
			descripcion=response.data.producto.descripcion
			count=response.data.entrada.cantidad
			Alert.alert("Entrada",`Se ha registrado entrada para:\n${nombre} x${count} \ndescripcion:${descripcion}`)
		})
		.catch((response)=>{
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}

	_handleBarCodeRead = data => {
		setEntrada({...entrada,codigo:data.data})
		setModalVisible(false)
	};

	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<Modal animationType="slide" transparent={false} visible={modalVisible}onRequestClose={() => {setModalVisible(false)}}>
				<View style={{flex: 1,alignItems: 'center',justifyContent: 'center',paddingTop: Constants.statusBarHeight,backgroundColor: '#ecf0f1',}}>
					{permiso === null ?
						<Text>Solicitando permiso de la camara</Text> :
						permiso === false ?
						<Text>Permiso de camara rechazado</Text> :
						<View style={{alignItems:'center',justifyContent:'center'}}>
							<Text>Escaneando</Text>
							<BarCodeScanner onBarCodeScanned={_handleBarCodeRead} style={{ height: 400, width: 400 }}/>
						</View>
					}
				</View>
			</Modal>
			<View style={{padding:20}}>
				<Input label="Codigo" onChangeText={(t)=>setEntrada({...entrada, codigo:t})} value={entrada.codigo} placeholder='Codigo de producto' leftIcon={<Icon name='barcode' size={24}/>}/>
				<Button onPress={()=>{setModalVisible(true)}} title="Scanear" type="clear"/>
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
