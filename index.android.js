/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Prueba COMMIT
 *kevin percy
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class RetosI extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        </Text>
        
        <View style = {styles.Content2}>
          <Text style={styles.andrei}>hola amigos, primer comid</Text>
        </View>
        <Text style={styles.instructions}>          
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  Content2:{
    flexDirection :'row',
  },
  andrei:{
    flex:1,
    textAlign:'right',
    fontSize:22,
    color:'#a03935',
  }
});

AppRegistry.registerComponent('RetosI', () => RetosI);
