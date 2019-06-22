import React, { useLayoutEffect, useEffect, useState } from 'react';
import {AsyncStorage, View, Text, ActivityIndicator} from 'react-native';
import Login from './components/login';
import axi from './bootstrap';


const App=()=>{
	const [auth, setAuth] = useState(false);
	const [log, setLog] = useState(false);
	const [user, setUser] = useState({})
	useEffect(()=>{
	async function fetchData() {
		const AUTH_TOKEN = await AsyncStorage.getItem('secure_token');
		axi.defaults.headers.common['Authorization'] = 'Bearer '+AUTH_TOKEN;
		axi.get('/api/auth/user').then(response=>{
			setUser(response.data)
			setAuth(true)
		}).catch(e=>{
			console.log(e.response.data)
			setLog(true)
		})
	}
	fetchData()
	},[])
	if(auth)return <Text>TE AMO</Text>
	if(log)return <Login />
	
	return (
		<View style={{flex: 1,justifyContent: 'center'}}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	)
}
export default App
