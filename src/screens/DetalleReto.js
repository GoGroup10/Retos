/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import RetoBox from '../components/RetoBox'
import Icon from 'react-native-vector-icons/Ionicons'
import { firebaseDatabase, firebaseAuth } from '../firebase'
import CommentList from '../components/CommentList'
const { width, height } = Dimensions.get('window');

export default class DetalleReto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    }
    
    componentDidMount() {
        this.getRetoCommentsRef().on('child_added', this.addComment);
    }
    componentWillUnmount() {
        this.getRetoCommentsRef().off('child_added', this.addComment);
    }
    addComment = (data) => {
        const comment = data.val()
        this.setState({
            comments: this.state.comments.concat(comment)
        })
    }
    handleSend = () => {
        const text = this.state.text
        const { uid, photoURL,displayName } = firebaseAuth.currentUser
        const retoCommentsRef = this.getRetoCommentsRef()
        var newCommentRef = retoCommentsRef.push();
        newCommentRef.set({
            text,
            userPhoto: photoURL,
            uid,
            displayName
        });
        this.setState({ text: '' })

    }
    getRetoCommentsRef = () => {
        const { id } = this.props.reto
        return firebaseDatabase.ref('commentsRetos/' + id)
    }
    handleChangeText = (text) => this.setState({ text })
    render() {
        const reto = this.props.reto
        const {comments} =this.state
        return (
            <View style={styles.container}>
                <RetoBox reto={reto} />

                <CommentList comments={comments} />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.text}
                        placeholder="Escribe un comentario..."
                        onChangeText={this.handleChangeText}
                    />
                    <TouchableOpacity onPress={this.handleSend}>
                        <Icon name="ios-send-outline" size={30} color="gray" />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        paddingTop: 30
    },
    inputContainer: {

        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 50,
    },
    header: {
        fontSize: 20,
        paddingHorizontal: 15,
        marginVertical: 10,
    }
});