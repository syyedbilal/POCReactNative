import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  
} from 'react-native';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';

const userInfo = {email:'admin',password:'1234'};

export default class Login extends Component{
   isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

   onSignIn = (googleUser)  => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
           googleUser.idToken,
           googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
        .then(function(result){
          console.log('User signed in')
          if(result.additionalUserInfo.isNewUser){
            firebase
            .database()
            .ref('/user/'+result.user.uid)
            .set({
            gmail:result.user.email,
            profile_picture:result.additionalUserInfo.profile.picture,
            locale:result.additionalUserInfo.profile.locale,
            first_name:result.additionalUserInfo.profile.given_name,
            last_name:result.additionalUserInfo.profile.family_name,
            created_at:Date.now()
            }).then(function(snapshot){
            });
          }
          else{
            firebase
            .database()
            .ref('/user/'+result.user.uid).update({
              last_logged_in:Date.now()
            })
          }
             })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

 signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId:'252205782450-segjkda00ro8r0ktils3knikne0lnen2.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      this.onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    console.log("error",e);
  }
}
  constructor(props){
    super(props);
this.state = {
  signedin:false,
  name:"",
  portUrl:""
}  }

	signup() {
		Actions.signup()
  }

  list=async()=>{
    if(userInfo.email === this.state.email && userInfo.password === this.state.password){
   Actions.dashboard()
 }
 else{
   alert('Email or password is incorrect. Please Check');
 }

   }
  


	render() {
		return(
			<View style={styles.container}>
				<Logo/>
				
        <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Username"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              onChangeText={(email)=>this.setState({email})}
              value={this.state.email}
         />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              onChangeText={(password)=>this.setState({password})}
              value={this.state.password}
           />  
           <TouchableOpacity style={styles.button} onPress={this.list}>
             <Text style={styles.buttonText}>Login</Text>
           </TouchableOpacity>     
           <TouchableOpacity style={styles.button} onPress={this.signInWithGoogleAsync}>
             <Text style={styles.buttonText}>Google Login</Text>
           </TouchableOpacity> 

				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
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
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});
