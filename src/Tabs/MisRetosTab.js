import React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
export default class MisRetosTab extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Mis Retos',
    tabBarIcon: () => (<Icon size={24} color="#535B9F" name="md-flash" />)
  }
 
  render() {
      return (<View>

      </View>)
  }
}