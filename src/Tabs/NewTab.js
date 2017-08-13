import React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
export default class NewTab extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Nuevo',
    tabBarIcon: () => (<Icon size={24} color="#535B9F" name="md-add-circle" />)
  }
 
  render() {
      return (<View>

      </View>)
  }
}