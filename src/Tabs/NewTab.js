import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Picker,
  TextInput,
  ScrollView,
  Button, DatePickerAndroid,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Toolbar from 'react-native-toolbar';
import store from '../store'
import Ripple from 'react-native-material-ripple';
import { firebaseDatabase, firebaseAuth } from '../firebase'

const screenWidth = Dimensions.get('window').width
export default class NewTab extends React.Component {
  constructor() {
    super()
    const { uid, photoURL, displayName } = firebaseAuth.currentUser
    this.state = {
      idUser: uid,
      nombre_reto: null,
      creador: displayName,
      photoCreador: photoURL,
      categoria: 'Futbol',
      fechaReto: 'Toque para establecer Fecha...',
      numero_paricipantes: null,
      latitude: 0,
      longitude: 0,
      isLoading: false,
    }
  }


  static navigationOptions = {
    tabBarLabel: 'Nuevo',
    tabBarIcon: () => (<Icon size={24} color="#FFF" name="md-add-circle" />)
  }

  AbrirPickerDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const mes = month < 9 ? '0' + (month + 1) : (month + 1)
        const dia = day < 10 ? '0' + day : day
        this.setState({ fechaReto: dia + '-' + mes + '-' + year })
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  onPressGuardarReto = () => {
    /*store.dispatch({
      type: 'SAVE_CHALLENGE',
      reto
    })*/
    const reto = this.state
    this.setState({ isLoading: true })
    const retosRef = this.getRetosRef()
    var newRetoRef = retosRef.push();
    newRetoRef.set({
      nombre_reto: reto.nombre_reto,
      creador: reto.creador,
      photoCreador: reto.photoCreador,
      categoria: reto.categoria,
      fechaReto: reto.fechaReto,
      numero_paricipantes: reto.numero_paricipantes,
      latitude: reto.latitude,
      longitude: reto.longitude
    }).then(() => {
      const retosUsuarioRef = this.getRetosUsuarioRef()
      var newRetoUsuarioRef = retosUsuarioRef.push();
      newRetoUsuarioRef.set({
        nombre_reto: reto.nombre_reto,
        creador: reto.creador,
        photoCreador: reto.photoCreador,
        categoria: reto.categoria,
        fechaReto: reto.fechaReto,
        numero_paricipantes: reto.numero_paricipantes,
        latitude: reto.latitude,
        longitude: reto.longitude
      }).then(() => {
        this.setState(
          {
            nombre_reto: null,
            categoria: 'Futbol',
            fechaReto: 'Toque para establecer Fecha...',
            numero_paricipantes: null,
            latitude: 0,
            longitude: 0,
            isLoading: false,
          }
        )
      })
    })
    console.log(newRetoRef)
  }
  getRetosRef = () => {
    return firebaseDatabase.ref('retos/')
  }
  getRetosUsuarioRef = () => {
    return firebaseDatabase.ref('retosUsuario/' + this.state.idUser + '/')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.titleToolbar}>Crear nuevo challenge</Text>
            <Image style={styles.image} source={require('../imgs/corriendo.jpg')} />
          </View>
        </View>
        <ScrollView style={styles.containerNuevo}>
          <Text style={styles.tituloLabel}>Categoria :</Text>
          <View style={styles.pickerCategoria}>

            <Picker
              selectedValue={this.state.categoria}
              onValueChange={(itemValue, itemIndex) => this.setState({ categoria: itemValue })}>
              <Picker.Item label="Futbol" value="Futbol" />
              <Picker.Item label="Voley" value="Voley" />
              <Picker.Item label="Basket" value="Basket" />
              <Picker.Item label="Tenis" value="Tenis" />
            </Picker>
          </View>
          <Text style={styles.tituloLabel}>Nombre del Reto :</Text>
          <TextInput
            value={this.state.nombre_reto}
            onChangeText={(text) => this.setState({ nombre_reto: text })}
            placeholder={"Escriba el nombre del Evento"} />
          <Text style={styles.tituloLabel}>Fecha del Reto :</Text>
          <TouchableOpacity style={styles.fechaChooser} onPress={() => this.AbrirPickerDate()}>
            <Icon size={35} color="#7f8c8d" name="md-calendar" /> 
            <Text style={{ width: screenWidth - 80, marginLeft:10, }} >{this.state.fechaReto}</Text>
            
          </TouchableOpacity>

          <Text style={styles.tituloLabel}>Cantidad de Participantes :</Text>
          <TextInput
            value={this.state.numero_paricipantes}
            onChangeText={(text) => this.setState({ numero_paricipantes: text })}
            keyboardType={'numeric'} placeholder={"Numero de participantes"} />
          
            <TouchableOpacity onPress={()=>this.onPressGuardarReto()}
              style={{justifyContent:'center',marginTop:60,alignItems:'center'}}>
              <Icon size={50} color="#16a085" name="ios-checkmark-circle" />
              <Text style={{color:'#16a085'}}>Toque para crear</Text>
            </TouchableOpacity>
          

        </ScrollView>
        {this.state.isLoading &&
          <View style={[styles.containerLoading, styles.overlay]}>
            <View style={{
              height: 100, width: 100,
              justifyContent: 'center', alignItems: 'center',
              backgroundColor: 'white', borderRadius: 10,
            }}>

              <ActivityIndicator size={'large'} />
              <Text style={{ fontWeight: 'bold', marginTop: 10, }}>Creando...</Text>
            </View>

          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  containerLoading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  containerNuevo: {
    padding: 10,
    backgroundColor: '#FFF',
    margin: 10,
    borderRadius: 10,
  },
  containerButton: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    minHeight: 56,
    margin: 4,
    borderRadius: 2,
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  a: {
    backgroundColor: '#EC268F',
  },
  textButton: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255,255,255,.87)',
    textAlign: 'center',

  },

  titleApp: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    opacity: 0.8,
    textShadowColor: '#EC268F'
  },
  pickerCategoria: {
    borderWidth: 1,
    borderColor: '#7f8c8d',
    borderRadius: 5,

  },
  botonGuardar: {
    marginTop: 30,
    
  },
  tituloLabel: { fontWeight: 'bold', paddingBottom: 5, paddingTop: 5, },
  fechaChooser: {
    flexDirection: 'row',
    alignItems: 'center'
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
});