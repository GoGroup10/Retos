/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
} from 'react-native';

import FBSDK,{
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'
import {Actions} from 'react-native-router-flux';
import firebase,{ 
  firebaseAuth 
} from "./firebase";

const {FacebookAuthProvider} = firebase.auth


export default class LoginView extends Component {
  constructor() {
     super();

     console.ignoredYellowBox = [
         'Setting a timer'
     ];
  }
  state = {
    credentials:null
  }
  
  componentWillMount(){
    this.authenticateUser()
  }

  authenticateUser =() =>{
    AccessToken.getCurrentAccessToken().then((data)=>{
      const {accessToken} = data
      const credential = FacebookAuthProvider.credential(accessToken)
      // Sign in user with another account
      firebaseAuth.signInWithCredential(credential).then((credentials) => {
        this.setState({credentials})
        Actions.home()
      }, function(error) {
        console.log("Sign In Error", error);
      });
    })
  }
  

  handleLoginFinish =(error, result) => {
              if (error) {
                console.error("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then((data)=>{
                  this.authenticateUser(data.accessToken)
                })
              }
            }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Challenger</Text>
        
        <LoginButton
          readPermissions={["public_profile","email"]}
          onLoginFinished={this.handleLoginFinish}
          onLogoutFinished={() => alert("logout.")}/>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent :'center',
    alignItems:'center'
  },
  welcome:{
    fontSize:24,
    fontWeight:'600',
    marginBottom:100,
    justifyContent :'center',
    backgroundColor:'transparent',
    color:'#EC268F'       
  },
  
});
