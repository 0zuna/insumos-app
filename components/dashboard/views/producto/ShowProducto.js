import React, {Component, useState, useContext, useEffect} from 'react';
import { View, ActivityIndicator, ScrollView, Modal, Alert } from 'react-native';
import { ThemeProvider, ListItem, Input, Button, Text, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../../UserContext';
import img_producto from '../../../../assets/producto.png';
import TouchableScale from 'react-native-touchable-scale';

ShowProducto = () =>{

	const [producto, setProducto] = useState({});
	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [productos,setProductos]=useState([])
	const [loader,setLoader]=useState(true)
	const [modalVisible,setModalVisible]=useState(false)
	useEffect(()=>{
		axi.get('/api/auth/producto')
		.then((response)=>{
			setProductos(response.data)
			setLoader(false)
		})
		.catch((response)=>{
			Alert.alert("Error","Se a producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	},[])

	const update=()=>{
		axi.put(`/api/auth/producto/${producto.id}`,producto)
		.then((response)=>{
			prod=productos.map((a)=>{
				if(a.id==producto.id)return producto
				return a
			})
			setProductos(prod)
			setModalVisible(false)
		})
		.catch((response)=>{
			Alert.alert("Error","Se a producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}

	const _delete=()=>{
		axi.delete(`/api/auth/producto/${producto.id}`,producto)
		.then((response)=>{
			prod=productos.filter(a=>a.id!==producto.id)
			setProductos(prod)
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
						<Avatar size="medium" rounded source={img_producto}/>
						<Text h4>Producto</Text>
					</View>
					<Input onChangeText={(t)=>setProducto({...producto,nombre:t})} value={producto.nombre} placeholder='Nombre del producto' leftIcon={<Icon name='cube' size={24}/>}/>
					<Input onChangeText={(t)=>setProducto({...producto,codigo:t})} value={producto.codigo} placeholder='Codigo' leftIcon={<Icon name='barcode' size={24}/>}/>
					<Input onChangeText={(t)=>setProducto({...producto,precio:t})} value={producto.precio} placeholder='Precio' leftIcon={<Icon name='dollar' size={24}/>}/>
					<Input onChangeText={(t)=>setProducto({...producto,descripcion:t})} value={producto.descripcion} placeholder='Descripcion' leftIcon={<Icon name='clipboard' size={24} color='black'/>}/>
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
			{productos.map((prod,i)=>(
				<ListItem
					key={i}
					Component={TouchableScale}
					friction={90}
					tension={100}
					activeScale={0.95}
					linearGradientProps={{colors: ['#AB47BC', '#873894'],start: [1, 0],end: [0.1, 0],}}
					leftAvatar={{ rounded: true, source: img_producto } }
					title={prod.nombre+'  $'+prod.precio}
					titleStyle={{ color: 'white', fontWeight: 'bold' }}
					subtitleStyle={{ color: 'white' }}
					subtitle={prod.descripcion}
					chevronColor="white"
					chevron
					button
					onPress={()=>{
						setProducto(prod)
						setModalVisible(true)
						}}
				/>))
			}
			</View>
			</ScrollView>
		</ThemeProvider>
	);
}


export default ShowProducto;
