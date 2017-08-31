/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseDatabase, firebaseAuth } from '../firebase'
const widthScreen = Dimensions.get('window').width
const DEFAULT_AVATAR = 'https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png'
const AVATAR_SIZE = 28
export default class RetoBox extends Component {
    state = {
        liked: false,
        likeCount: 0
    }

    /*componentWillMount() {
        const { uid } = firebaseAuth.currentUser
        this.getArtistRef().on('value', snapshot => {
            const artist = snapshot.val()
            if (artist) {
                this.setState({
                    likeCount: artist.likeCount,
                    liked: artist.likes && artist.likes[uid]
                })
            }
        })
    }*/

    handlePress = () => {
        this.toggleLike(!this.state.liked)
    }
    getArtistRef = () => {
        const { id } = this.props.artist
        return firebaseDatabase.ref('artist/' + id)
    }
    toggleLike = (liked) => {
        const { uid } = firebaseAuth.currentUser
        this.getArtistRef().transaction(function (artist) {
            if (artist) {
                if (artist.likes && artist.likes[uid]) {
                    artist.likeCount--;
                    artist.likes[uid] = null;
                } else {
                    artist.likeCount++;
                    if (!artist.likes) {
                        artist.likes = {};
                    }
                    artist.likes[uid] = true;
                }
            }
            return artist || {
                likeCount: 1,
                likes: {
                    [uid]: true
                }
            };
        });
    }
    getNombreMes = (mes) => {
        switch (mes) {
            case '01': return 'Ene'; case '07': return 'Jul';
            case '02': return 'Feb'; case '08': return 'Ago';
            case '03': return 'Mar'; case '09': return 'Set';
            case '04': return 'Abr'; case '10': return 'Oct';
            case '05': return 'May'; case '11': return 'Nov';
            case '06': return 'Jun'; case '12': return 'Dic';
        }
    }

    render() {
        //console.warn('el nombre',this.props.artist.name)
        const { nombre_reto, creador, fechaReto, photoCreador, numero_paricipantes, categoria } = this.props.reto
        const date = fechaReto.split('-')[0]
        const mes = this.getNombreMes(fechaReto.split('-')[1])

        const likeIcon = this.state.liked ?
            <Icon name="ios-heart" size={30} color="#e74c3c" /> :
            <Icon name="ios-heart-outline" size={30} color="gray" />

        var { likeCount } = this.state
        return (
            <TouchableOpacity style={styles.artistBox}>
                <View style={{ flexDirection: 'column' }}>
                    <Image style={styles.image} source={require('../imgs/corriendo.jpg')} />
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{date + ' ' + mes}</Text>
                </View>

                {/*<Icon name='ios-football' size={50} />*/}
                <View style={{ flexDirection: 'row', width: widthScreen - 120, }}>
                    <View style={styles.info}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.name}>{categoria}</Text>
                            <Text style={styles.fecha}>"{nombre_reto}"</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon style={[{ marginLeft: 15 }]} name='md-calendar' size={35} />
                            <Text style={[styles.fecha]}>{fechaReto}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            photoCreador ?
                                <Image style={styles.avatar} source={{ uri: photoCreador}} /> :
                                <Image style={styles.avatar} source={{ uri: DEFAULT_AVATAR }} />
                        }
                        <Text style={styles.fecha}>Por: {creador}</Text>
                        
                        </View>  
                        
                    </View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Icon name='ios-people-outline' size={30} color={'#FF80AB'} />
                    <Text style={{ textAlign: 'center', fontSize: 12, }}>{numero_paricipantes}</Text>
                </View>

            </TouchableOpacity>
        );

    }
}

const styles = StyleSheet.create({
    artistBox: {
        alignItems: 'center',
        margin: 5,
        marginRight:10,
        marginLeft:10,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 1,
            width: -2
        },
        elevation: 2,
        padding: 5,
        borderRadius:10,
    },
    image: {
        width: 50,
        height: 50,

    },
    info: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 15,
        fontWeight: 'bold'
    },
    fecha: {
        marginLeft: 5,

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 15
    },
    iconContainer: {
        flexDirection: 'column',
        flex: 1,

    },
    icon: {
        alignItems: 'center',
    },
    count: {
        color: 'gray',
        textAlign: 'center'
    },
    avatar:{
        marginLeft:15,
        width:AVATAR_SIZE,
        height:AVATAR_SIZE,
        borderRadius:AVATAR_SIZE/2,
    },

});
