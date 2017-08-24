import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Toolbar from 'react-native-toolbar';
import store from '../store'
export default class HomeTab extends React.Component {
  constructor(){
    super()

    store.subscribe(()=>{
      console.log(store.getState().reto)
    });
  }

  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => (<Icon size={24} color="#535B9F" name="md-home" />)
  }

  render() {
    const BLUE_LINK = '#535B9F'
    return (
      <View style={styles.container}>
        <Toolbar
          toolbarHeight={50}
          toolbarZIndex={3}
          backgroundColor={'#535B9F'}
          ref={(toolbar) => this.toolbar = toolbar}
          presets={{

            toolbar1: {
              title: {
                text: 'Challenger',
                textStyle: styles.titleApp,
              },
            },
          }} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  titleApp: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    opacity: 0.8,
    textShadowColor: '#EC268F'
  }

});