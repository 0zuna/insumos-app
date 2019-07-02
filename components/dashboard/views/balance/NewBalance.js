import React, {Component, useState, useContext, useEffect} from 'react';
import { View } from 'react-native';
import { ThemeProvider, Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../../UserContext';
import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';
import DatePicker from 'react-native-datepicker';



NewEntrada= () =>{

	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [dateI,setDateI] = useState('')
	const [dateF,setDateF] = useState('')

	descarga=()=>{
		if(dateI && dateF)
			Linking.openURL(axi.defaults.baseURL+`/api/auth/reporte/${user.id}/${dateI}/${dateF}`);
		//   WebBrowser.openBrowserAsync('http://192.168.0.10/insumos/public/api/auth/reporte');
	}

	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<View style={{padding:20}}>
				<Text>Fecha Inicio</Text>
				<DatePicker
					style={{width: 100+'%'}}
					date={dateI}
					mode="date"
					placeholder="seleccionar fecha inicio"
					format="YYYY-MM-DD"
					minDate="2019-07-02"
					maxDate="2020-07-02"
					confirmBtnText="Confirmar"
					cancelBtnText="Cancelar"
					customStyles={{dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0}}}
					onDateChange={(date) => {setDateI(date)}}
				/>
				<Text>Fecha Fin</Text>
				<DatePicker
					style={{width: 100+'%'}}
					date={dateF}
					mode="date"
					placeholder="seleccionar fecha fin"
					format="YYYY-MM-DD"
					minDate="2019-07-02"
					maxDate="2020-07-02"
					confirmBtnText="Confirmar"
					cancelBtnText="Cancelar"
					customStyles={{dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0}}}
					onDateChange={(date) => {setDateF(date)}}
				/>
				<Button onPress={descarga} title="generar" type="clear"/>
			</View>
		</ThemeProvider>
	);
}

export default NewEntrada;
