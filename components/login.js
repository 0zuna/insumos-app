import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import axi from '../bootstrap';
import {AsyncStorage} from 'react-native';


const Login=props=>{
	const [user, setUser] = useState({});
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	//useEffect(()=>{console.log(email)});
	const  logan = () => {
		console.log(email)
		console.log(pass)
		axi.post('/api/auth/login',{"email":email,"password":pass,})
		.then(async response=> {
			console.log(response.data);
			Alert.alert('Esta sesion expira el '+response.data.expires_at)
			await AsyncStorage.setItem('secure_token',response.data.access_token);
			props.axi.defaults.headers.common['Authorization'] = 'Bearer '+response.data.access_token;
			props.auth(true)
		}).catch(e=>{
			console.log(e.response.data)
			Alert.alert('Las credenciales no coinciden con nuestras bases de datos')
		})
	}

	return (
		<ImageBackground source={require('../assets/login.jpg')} style={{width: '100%', height: '100%'}}>
			<View style={styles.log}>
				<Text style={{color:'white',fontSize: 20}}>Login</Text>
				<TextInput onChangeText={(t)=>setEmail(t)} value={email} style={styles.input} placeholder={'Correo'} placeholderTextColor='rgba(255,255,255,.7)'/>
				<TextInput onChangeText={(t)=>setPass(t)} value={pass} style={styles.input} placeholder={'Contraseña'} placeholderTextColor='rgba(255,255,255,.7)' secureTextEntry={true}/>
				<TouchableOpacity style={styles.btnLog} onPress={logan}>
					<Text style={{color:'white',fontSize: 20,textAlign:'center'}}>Entrar</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}
export default Login
