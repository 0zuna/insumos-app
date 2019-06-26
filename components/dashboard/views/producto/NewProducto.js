import React, {Component, useState, useContext, useEffect} from 'react';
import { Text, View, StyleSheet, Alert, Picker, ScrollView, ActivityIndicator } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../../UserContext';

NewProducto = () =>{
	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [producto, setProducto]=useState({})
	const [proveedores,setProv]=useState([])
	const [loader,setLoader]=useState(true)

	useEffect(()=>{
		axi.get('/api/auth/proveedor')
		.then((response)=>{
			setProv(response.data)
			setLoader(false)
		})
	},[])
	const register=()=>{
		axi.post('/api/auth/producto',producto)
		.then((response)=>{
			Alert.alert('Producto guardado n_n')
			setProducto({})
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
			<View style={{padding:20}}>
				<Input label="Nombre" onChangeText={(t)=>setProducto({...producto,nombre:t})} value={producto.nombre} placeholder='Nombre del Producto' leftIcon={<Icon name='cube' size={24}/>}/>
				<Input label="Codigo" onChangeText={(t)=>setProducto({...producto,codigo:t})} value={producto.codigo} placeholder='Codigo' leftIcon={<Icon name='barcode' size={24}/>}/>
				<Input label="Precio" onChangeText={(t)=>setProducto({...producto,precio:t})} value={producto.precio} placeholder='Precio' leftIcon={<Icon name='dollar' size={24}/>}/>
				<Input label="Descripcion" onChangeText={(t)=>setProducto({...producto,descripcion:t})} value={producto.descripcion} placeholder='Descripcion' leftIcon={<Icon name='clipboard' size={24}/>}/>
				<ScrollView>
				<Picker selectedValue={producto.proveedor_id}
					onValueChange={(v, i) =>setProducto({...producto,proveedor_id: v})}>
					<Picker.Item label="Selecciona el proveedor" value="0" />
					{
						proveedores.map(pro=>{
							return <Picker.Item key={pro.id} label={pro.nombre} value={pro.id} />
						})
					}
				</Picker>
				</ScrollView>
				<View style={{marginTop:20}}>
				<Button onPress={register} title="Registrar" type="clear"/>
				</View>
			</View>
		</ThemeProvider>
	);
}

export default NewProducto;
