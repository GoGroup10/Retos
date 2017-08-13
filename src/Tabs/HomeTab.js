import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
export default class HomeTab extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => (<Icon size={24} color="#535B9F" name="md-home" />)
  }
 
  render() {
      return (
        <View style={styles.container}> 
          <View style={{width: null, height: 50, backgroundColor: 'white'}} />
        </View>
      )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',

    paddingTop:Platform.select({
      ios:20,
      android:0,
    }),
  }
  
});