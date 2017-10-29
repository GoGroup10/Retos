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
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import firebase, {
  firebaseAuth
} from "../firebase";


export default class SeleccionDeportes extends Component {
  constructor() {
    super();

    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
    }
  }
  

  componentWillMount() {
  }
  
  
  render() {
    return (
      <View style={styles.container}>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },

});
