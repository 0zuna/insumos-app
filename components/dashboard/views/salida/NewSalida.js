import React, {Component, useState, useEffect, useContext} from 'react';
import { Text, View, Alert, Modal } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../../UserContext';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';



NewSalida = () =>{

	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [salida, setSalida] = useState({});
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
		axi.post('/api/auth/salida',salida)
		.then((response)=>{
			setSalida({})
			nombre=response.data.producto.nombre
			descripcion=response.data.producto.descripcion
			disponibles=response.data.disponibilidad.disponibles
			if(response.status==201){
				count=response.data.salida.cantidad
				if(response.data.disponibilidad.porciento<=50){
					Alert.alert(
						"Disponibilidad de productos por debajo del 50%",
						`Favor de consultar con el administrador de productos ${nombre}`,
						[{
							text: 'OK', onPress: () =>Alert.alert("Salida",`Se ha registrado salida para:\n${nombre} x${count} \ndescripcion:${descripcion} \ndisponibles:${disponibles}x`)
						}]
					)
				}else
					Alert.alert("Salida",`Se ha registrado salida para:\n${nombre} x${count} \ndescripcion:${descripcion} \ndisponibles:${disponibles}x`)
			}
			else{
				Alert.alert("Error",`${disponibles}x ${nombre} disponibles`)
			}
		})
		.catch((response)=>{
			console.log(response)
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}

	_handleBarCodeRead = data => {
		setSalida({...salida,codigo:data.data})
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
				<Input label="Codigo" onChangeText={(t)=>setSalida({...salida, codigo:t})} value={salida.codigo} placeholder='Codigo de producto' leftIcon={<Icon name='barcode' size={24}/>}/>
				<Button onPress={()=>{setModalVisible(true)}} title="Scanear" type="clear"/>
				<Input label="Cantidad" onChangeText={(t)=>setSalida({...salida, cantidad:t})} value={salida.cantidad} placeholder='Cantidad' leftIcon={<Icon name='shopping-cart' size={24}/>}/>
				<View style={{marginTop:20}}>
				<Button onPress={register} title="Registrar salida" type="clear"/>
				</View>
			</View>
		</ThemeProvider>
	);
}

export default NewSalida;
