import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	log: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input:{
		margin:5,
		width:70+'%',
		height:45,
		borderRadius:25,
		fontSize:16,
		paddingLeft:45,
		backgroundColor:'rgba(0,0,0,.35)',
		color:'rgba(255,255,255,.7)',
		marginHorizontal:25
	},
	btnLog:{
		width:70+'%',
		height:50,
		//borderRadius:25,
		//fontSize:18,
		backgroundColor:'#FF9000',
		//textAlign:'center',
		padding:10,
		marginTop:20
	}
});

export default styles
