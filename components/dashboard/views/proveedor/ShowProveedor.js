import React, {Component, useState, useContext, useEffect} from 'react';
import { View, ActivityIndicator, ScrollView, Modal, Alert } from 'react-native';
import { ThemeProvider, ListItem, Input, Button, Text, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../../UserContext';
import img_proveedor from '../../../../assets/proveedor.png';
import TouchableScale from 'react-native-touchable-scale';

ShowProveedor = () =>{

	const [proveedor, setProveedor] = useState({});
	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [proveedores,setProv]=useState([])
	const [loader,setLoader]=useState(true)
	const [modalVisible,setModalVisible]=useState(false)
	useEffect(()=>{
		axi.get('/api/auth/proveedor')
		.then((response)=>{
			setProv(response.data)
			setLoader(false)
		})
		.catch((response)=>{
			Alert.alert("Error","Se a producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	},[])

	const update=()=>{
		axi.put(`/api/auth/proveedor/${proveedor.id}`,proveedor)
		.then((response)=>{
			prov=proveedores.map((a)=>{
				if(a.id==proveedor.id)return proveedor
				return a
			})
			setProv(prov)
			setModalVisible(false)
		})
		.catch((response)=>{
			Alert.alert("Error","Se a producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}

	const _delete=()=>{
		axi.delete(`/api/auth/proveedor/${proveedor.id}`,proveedor)
		.then((response)=>{
			prov=proveedores.filter(a=>a.id!==proveedor.id)
			setProv(prov)
			setModalVisible(false)
		})
		.catch((response)=>{
			Alert.alert("Error","Se a producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}

	if(loader)
		return (
			<View style={{flex: 1,justifyContent: 'center'}}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)

	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<Modal animationType="slide" transparent={false} visible={modalVisible}onRequestClose={() => {setModalVisible(false)}}>
			<ThemeProvider theme={{ colors: {primary: 'black'}}}>
				<View style={{padding:20}}>
					<View style={{alignItems: 'center',justifyContent:'center'}}>
						<Avatar size="medium" rounded source={img_proveedor}/>
						<Text h4>Proveedor</Text>
					</View>
					<Input onChangeText={(t)=>setProveedor({...proveedor,"nombre":t})} value={proveedor.nombre} placeholder='Nombre del Proveedor' leftIcon={<Icon name='user' size={24}/>}/>
					<Input onChangeText={(t)=>setProveedor({...proveedor,"domicilio":t})} value={proveedor.domicilio} placeholder='Domicilio del Proveedor' leftIcon={<Icon name='home' size={24}/>}/>
					<Input onChangeText={(t)=>setProveedor({...proveedor,"telefono":t})} value={proveedor.telefono} placeholder='Telefono del Proveedor' leftIcon={<Icon name='phone' size={24} color='black'/>}/>
					<Input onChangeText={(t)=>setProveedor({...proveedor,"email":t})} value={proveedor.email} placeholder='Correo del Proveedor' leftIcon={<Icon name='envelope' size={24}/>}/>
					<Input onChangeText={(t)=>setProveedor({...proveedor,"forma_pago":t})} value={proveedor.forma_pago} placeholder='Forma de Pago' leftIcon={<Icon name='money' size={24}/>}/>
					<View style={{margin:20}}>
						<Button onPress={update} title="Actualizar" type="clear"/>
					</View>
					<View style={{margin:20}}>
						<Button onPress={_delete} titleStyle={{ color: 'red' }} title="Borrar" type="clear"/>
					</View>
				</View>
			</ThemeProvider>
			</Modal>
			<ScrollView>
			<View style={{padding:20}}>
			{proveedores.map((prov,i)=>(
				<ListItem
					key={i}
					Component={TouchableScale}
					friction={90}
					tension={100}
					activeScale={0.95} //
					linearGradientProps={{colors: ['#FF9800', '#F44336'],start: [1, 0],end: [0.1, 0],}}
					leftAvatar={{ rounded: true, source: img_proveedor } }
					title={prov.nombre}
					titleStyle={{ color: 'white', fontWeight: 'bold' }}
					subtitleStyle={{ color: 'white' }}
					subtitle={prov.telefono}
					chevronColor="white"
					chevron
					button
					onPress={()=>{
						setProveedor(prov)
						setModalVisible(true)
						}}
				/>))
			}
			</View>
			</ScrollView>
		</ThemeProvider>
	);
}


export default ShowProveedor;
