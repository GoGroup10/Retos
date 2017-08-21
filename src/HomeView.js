/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {NavigationComponent} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { TabNavigator } from 'react-navigation'
import HomeTab from './Tabs/HomeTab'
import FriendsTab from './Tabs/FriendsTab'
import MisRetosTab from './Tabs/MisRetosTab'
import NewTab from './Tabs/NewTab'
import PerfilTab from './Tabs/PerfilTab'
const Pestanas = TabNavigator({
  Home: { screen: HomeTab },
  Friends: { screen: FriendsTab },
  New: { screen: NewTab },
  MisRetos: { screen: MisRetosTab },
  Perfil: { screen: PerfilTab }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: '#535B9F',
      rippleColor: '#535B9F',
      shifting:false,
      tabs: {
        Home: {
          barBackgroundColor: '#FFF',// like in the standalone version, this will override the already specified `labelColor` for this tab
          activeLabelColor: '#EC268F',
          activeIcon: <Icon size={24} color="#EC268F" name="md-home" />
        },
        Friends: {
          barBackgroundColor: '#FFF', // like in the standalone version, this will override the already specified `labelColor` for this tab
          activeLabelColor: '#EC268F',
          activeIcon: <Icon size={24} color="#EC268F" name="md-people" />
        },
        New: {
          barBackgroundColor: '#FFF', // like in the standalone version, this will override the already specified `labelColor` for this tab
          activeLabelColor: '#EC268F',
          activeIcon: <Icon size={24} color="#EC268F" name="md-add-circle" />
        },
        MisRetos:{
           barBackgroundColor: '#FFF', // like in the standalone version, this will override the already specified `labelColor` for this tab
          activeLabelColor: '#EC268F',
          activeIcon: <Icon size={24} color="#EC268F" name="md-flash" />
        },
        Perfil: {
          barBackgroundColor: '#FFF',// like in the standalone version, this will override the already specified `labelColor` for this tab
          activeLabelColor: '#EC268F',
          activeIcon: <Icon size={24} color="#EC268F" name="md-contact" />
        },
      }
    }
  }
})


export default class HomeView extends Component {
 
  render() {
    return (
      <Pestanas/>  
    );
  }
}



