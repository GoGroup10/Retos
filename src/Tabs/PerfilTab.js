import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { firebaseDatabase, firebaseAuth } from '../firebase'

const widthScreen = Dimensions.get('window').width
const DEFAULT_AVATAR = 'https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png'
const AVATAR_SIZE = 100
export default class PerfilTab extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Perfil',
    tabBarIcon: () => (<Icon size={24} color="#FFF" name="md-contact" />)
  }
  constructor() {
    super()
    const { uid, photoURL, displayName } = firebaseAuth.currentUser
    this.state = {
      photo: photoURL,
      nombre_usuario: displayName,
    }
  }
  render() {
    const { nombre_usuario, photo } = this.state

    return (<View style={styles.container}>
      <View style={styles.toolbar}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.titleToolbar}>Mi Perfil</Text>
          <Image style={styles.image} source={require('../imgs/corriendo.jpg')} />
        </View>
      </View>

      <View style={styles.containerNuevo}>
        <View style={{ marginTop: 20, }}>
          <View style={{ alignItems: 'center' }}>
            {
              photo ?
                <Image style={styles.avatar} source={{ uri: photo }} /> :
                <Image style={styles.avatar} source={{ uri: DEFAULT_AVATAR }} />
            }
            <Text style={styles.nombre}>{nombre_usuario}</Text>

          </View>
        </View>
      </View>
    </View>)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerNuevo: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
    margin: 10,
    borderRadius: 10,
  },
  titleApp: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    opacity: 0.8,
    textShadowColor: '#EC268F'
  },
  toolbar: {
    backgroundColor: '#FFF',
    height: 55,
    elevation: 10,
    justifyContent: 'center'

  },
  titleToolbar: {
    fontWeight: 'bold',
    color: '#535B9F',
  },
  image: {
    width: 40,
    height: 40,

  },
  avatar: {
    marginLeft: 15,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  nombre: {
    fontSize: 18,
    marginTop: 10,
    fontWeight:'bold',
  }
});