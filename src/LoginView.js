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
  AsyncStorage,
} from 'react-native';

import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux';
import firebase, {
  firebaseAuth
} from "./firebase";

const { FacebookAuthProvider } = firebase.auth


export default class LoginView extends Component {
  constructor() {
    super();

    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
  state = {
    credencialsUser:null,
  }

  componentWillMount() {
    //this.recuperarClaves()
    Actions.pop()
  }
  guardarClaves=async(credencial)=>{
    try {
      await AsyncStorage.setItem('CREDENTIALS', JSON.stringify(credencial));
    } catch (error) {
      // Error saving data
    }
  }
  recuperarClaves=async()=>{
    try {
      const value = await AsyncStorage.getItem('CREDENTIALS');
      if (value !== null){
        // We have data!!
        const credentials=(JSON.parse(value)).credentialsUser
        this.setState({
          credentialsUser:{
            uid: credentials.uid,
            displayName: credentials.displayName,
            email: credentials.email,
            photoURL: credentials.photoURL,
          }
        })
        Actions.home()
        Actions.pop({key:'login'})
      }else{
        this.authenticateUser()
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }
  authenticateUser = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data) {
        const { accessToken } = data
        const credential = FacebookAuthProvider.credential(accessToken)
        // Sign in user with another account
        firebaseAuth.signInWithCredential(credential).then((credentials)  => {
          this.setState({
            credentialsUser:{
              uid: credentials.uid,
              displayName: credentials.displayName,
              email: credentials.email,
              photoURL: credentials.photoURL,
            }
          })
          this.guardarClaves(this.state)
          Actions.home()
        }, function (error) {
          console.log("Sign In Error", error);
        });
      }
    })
  }


  handleLoginFinish = (error, result) => {
    if (error) {
      console.error("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
        this.authenticateUser(data.accessToken)
      })
    }
  }
  hanleLogOut =async()=>{
    try {
      await AsyncStorage.removeItem('CREDENTIALS');
    } catch (error) {
      // Error saving data
      alert('Intente de nuevo.')
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require('./imgs/logo_challenge.jpg')} />
        </View>
        <Text style={styles.welcome}>Challenge</Text>

        <LoginButton
          readPermissions={["public_profile", "email"]}
          onLoginFinished={this.handleLoginFinish}
          onLogoutFinished={() => this.hanleLogOut()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353432',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 50,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: '#EC268F'
  },
  logoContainer: {

  },
  logo: {
    width: 100,
    height: 100,
  }

});
