import React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
export default class PerfilTab extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Perfil',
    tabBarIcon: () => (<Icon size={24} color="#535B9F" name="md-contact" />)
  }
 
  render() {
      return (<View>

      </View>)
  }
}