import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Toolbar from 'react-native-toolbar';
import store from '../store'
import { firebaseDatabase, firebaseAuth } from '../firebase'
import RetosList from '../components/RetosList'
export default class HomeTab extends React.Component {
  constructor() {
    super()
    this.state={
      retos:[],
      isLoading:false,
    }
    store.subscribe(() => {
      console.log(store.getState().reto)
    });
  }

  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => (<Icon size={24} color="#FFF" name="md-home" />)
  }
  componentWillMount() {
    
    this.getRetosRef().on('child_added', this.addReto);
    
  }
  componentWillUnmount() {
    this.getRetosRef().off('child_added', this.addReto);
  }
  addReto = (data) => {
    const reto = data.val()
    reto['id']=data.key
    this.setState({
      retos:this.state.retos.concat(reto),
      isLoading:false 
    })
    
  }
  getRetosRef = () => {
    return firebaseDatabase.ref('retos/')
  }
  render() {
    const BLUE_LINK = '#535B9F'
    const {retos} = this.state
    return (
      <View style={styles.container}>
          <View style={styles.toolbar}>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={styles.titleToolbar}>Mis Challenges</Text>
                  <Image style={styles.image} source={require('../imgs/corriendo.jpg')} />
              </View>
          </View>
          <View >
            {this.state.isLoading && <ActivityIndicator size={'large'}/>}
          <RetosList  retos={retos} />
          </View>
          
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:55,
  },
  titleApp: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    opacity: 0.8,
    textShadowColor: '#EC268F'
  },
  toolbar:{
    backgroundColor:'#FFF',
    height:55,
    elevation:10,
    justifyContent:'center'
    
  },
  titleToolbar:{
    fontWeight:'bold',
    color:'#535B9F',
  },
  image: {
    width: 40,
    height: 40,

  },
});