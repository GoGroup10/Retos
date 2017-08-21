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
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Toolbar from 'react-native-toolbar';

const screenWidth = Dimensions.get('window').width
export default class NewTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      language: 'Futbol',
      fechaReto:'Toque para establecer Fecha...',

    }
  }


  static navigationOptions = {
    tabBarLabel: 'Nuevo',
    tabBarIcon: () => (<Icon size={24} color="#535B9F" name="md-add-circle" />)
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
        const mes=month<9?'0'+(month+1):(month+1)
        const dia=day<9?'0'+day:day
        this.setState({fechaReto:dia+'-'+mes+'-'+year})
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
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
                text: 'Nuevo Reto',
                textStyle: styles.titleApp,
              },
            },
          }}>
        </Toolbar>
        <ScrollView style={styles.containerNuevo}>
          <Text style={styles.tituloLabel}>Categoria :</Text>
          <View style={styles.pickerCategoria}>

            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
              <Picker.Item label="Futbol" value="futbol" />
              <Picker.Item label="Voley" value="voley" />
            </Picker>
          </View>
          <Text style={styles.tituloLabel}>Nombre del Reto :</Text>
          <TextInput placeholder={"Escriba el nombre del Evento"} />
          <Text style={styles.tituloLabel}>Fecha del Reto :</Text>
          <TouchableOpacity style={styles.fechaChooser} onPress={() => this.AbrirPickerDate()}>
            <Text style={{ width: screenWidth - 50, }} >{this.state.fechaReto}</Text>
            <Icon size={35} color="#535B9F" name="md-calendar" />
          </TouchableOpacity>

          <Text style={styles.tituloLabel}>Cantidad de Participantes :</Text>
          <TextInput keyboardType={'numeric'} placeholder={"Numero de participantes"} />
          <View style={styles.botonGuardar}>
            <Button onPress={() => this.AbrirPickerDate()}
              title={"Crear Reto"} accessibilityLabel="Al hacer clic se creara el Reto"></Button>
          </View>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  containerNuevo: {
    padding: 10,
    marginTop: 80,

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
    borderColor: '#535B9F',
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
});