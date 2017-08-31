/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  AsyncStorage
} from 'react-native';

import { Scene, Router } from 'react-native-router-flux';
import LoginView from './LoginView'
import HomeView from './HomeView'

class RetosI extends React.Component {

  render() {
    const isAndroid = Platform.OS === 'android'
    return (
      <Router>
        <Scene duration={5} key="root">
          <Scene key="login"  component={LoginView} initial hideNavBar>
            
          </Scene>
          <Scene key="home" component={HomeView} hideNavBar />
        </Scene>
      </Router>
    );
  }
}



AppRegistry.registerComponent('RetosI', () => RetosI);
