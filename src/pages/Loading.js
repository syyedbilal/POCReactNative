import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
 ActivityIndicator
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import  firebase from 'firebase'


export default class Loading extends Component {

componentDidMount(){
    this.checkediflogin();
}

    checkediflogin =() =>{
        firebase.auth().onAuthStateChanged(function(user){
if(user){
    Actions.dashboard();
}
else{
    Actions.login();
}
        }.bind(this)
        );
    }

	render() {
		return(
            
            <View style={styles.container}>
                <ActivityIndicator />
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
});
