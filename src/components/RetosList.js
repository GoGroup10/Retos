
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
} from 'react-native';

import RetoBox from './RetoBox'

export default class RetosList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    }
  }
  componentDidMount(){
      this.updateDataSource(this.props.retos)
  }
  componentWillReceiveProps(newProps){
      if(newProps.retos!==this.props.retos){
          this.updateDataSource(newProps.retos)
      }
  }
  updateDataSource = data =>{
      this.setState({
              dataSource:this.state.dataSource.cloneWithRows(data)
          })
  }
  render() {
    
    return (
      <ListView
          
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(reto) => {
            return(
                <RetoBox reto={reto}/>
            ) 
            }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop:50
  }
  
});

