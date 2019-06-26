import PropTypes from 'prop-types';
import React, {Component,useEffect, useContext} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View,Button,TouchableOpacity,AsyncStorage} from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
import {UserContext} from '../../UserContext';
import {Divider} from 'react-native-elements'

const SideMenu=(props)=>{
	const [user,setAuth,setLog,axi]=useContext(UserContext);
	useEffect(()=>{
		console.log(user)
	},[])
	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		props.navigation.dispatch(navigateAction);
	}
	exit=()=>{
		setAuth(false)
		axi.get('/api/auth/logout').then((response)=>{
			setLog(true)
		});
	}
	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.sectionHeadingStyle}>
						Proveedores
					</Text>
					<View>
						<Text style={styles.navItemStyle} onPress={navigateToScreen('NewProveedor')}>
							Nuevo Proveedor
						</Text>
					</View>
					<View>
						<Text style={styles.navItemStyle} onPress={navigateToScreen('ShowProveedor')}>
							Mis Proveedores
						</Text>
					</View>
				</View>
				<Divider style={{ backgroundColor: 'blue' }} />
			</ScrollView>
			<TouchableOpacity onPress={exit} style={styles.footerContainer}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Icon name="log-out" size={30} />
				<Text>Salir</Text>
			</View>
			</TouchableOpacity>
		</View>
	);
}

SideMenu.propTypes = {
	navigation: PropTypes.object
};

export default SideMenu;
