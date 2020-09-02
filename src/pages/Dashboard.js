import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';

import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';


export default class Dashboard extends Component{


  list() {
       Actions.list()
    }

    list1() {
        Actions.listname()
     }
     
     mapform(){
       Actions.googleformmap()
     }
  


	render() {
		return(
			<View style={styles.container}>

           <Image  style={{width:100, height: 100, marginTop:100}}
          			source={require('../images/pic1.png')}/>
            <Text style={styles.logoText}>Admin</Text>
            <TextInput style={styles.inputBox} />
            <TextInput style={styles.inputBox} />
		 
           <TouchableOpacity style={styles.button} onPress={this.list}>
             <Text style={styles.buttonText}>Create Notes</Text>
           </TouchableOpacity>     

           <TouchableOpacity style={styles.button} onPress={this.list1}>
             <Text style={styles.buttonText}>Api fetch data</Text>
           </TouchableOpacity>   

           <TouchableOpacity style={styles.button} onPress={this.mapform}>
             <Text style={styles.buttonText}>Find Location</Text>
           </TouchableOpacity> 


				<View style={styles.signupTextCont}>
					{/* <Text style={styles.signupText}>Don't have an account yet?</Text> */}
					<TouchableOpacity onPress={()=>firebase.auth().signOut()}>
          <Text style={styles.signupButton}> Logout </Text>
          </TouchableOpacity>
				</View>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  logoText : {
    marginVertical: 15,
    fontSize:18,
    color:'rgba(255, 255, 255, 0.7)'
},
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
 
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13,
 },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});
