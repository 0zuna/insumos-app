import React, {Component, useState, useContext} from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../../UserContext';



NewProveedor = () =>{

	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [nombre, setNombre] = useState("");
	const [domicilio, setDomicilio] = useState("");
	const [telefono, setTelefono] = useState("");
	const [email, setEmail] = useState("");
	const [forma_pago, setForma] = useState("");

	const register=()=>{
		axi.post('/api/auth/proveedor',{nombre,domicilio,telefono,email,forma_pago})
		.then((response)=>{
			setNombre('')
			setDomicilio('')
			setTelefono('')
			setEmail('')
			setForma('')
			Alert.alert('Proveedor guardado n_n')
		})
	}
	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<View style={{padding:20}}>
				<Input onChangeText={(t)=>setNombre(t)} value={nombre} placeholder='Nombre del Proveedor' leftIcon={<Icon name='user' size={24}/>}/>
				<Input onChangeText={(t)=>setDomicilio(t)} value={domicilio} placeholder='Domicilio del Proveedor' leftIcon={<Icon name='home' size={24}/>}/>
				<Input onChangeText={(t)=>setTelefono(t)} value={telefono} placeholder='Telefono del Proveedor' leftIcon={<Icon name='phone' size={24} color='black'/>}/>
				<Input onChangeText={(t)=>setEmail(t)} value={email} placeholder='Correo del Proveedor' leftIcon={<Icon name='envelope' size={24}/>}/>
				<Input onChangeText={(t)=>setForma(t)} value={forma_pago} placeholder='Forma de Pago' leftIcon={<Icon name='money' size={24}/>}/>
				<View style={{marginTop:20}}>
				<Button onPress={register} title="Registrar" type="clear"/>
				</View>
			</View>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default NewProveedor;
