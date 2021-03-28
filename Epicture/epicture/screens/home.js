import React, { Component } from 'react'
import {StyleSheet,View, Text} from "react-native" ;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
    state = {
        token: {}
    }
    async componentDidMount(){
        var token = await AsyncStorage.getItem("token")
        token = JSON.parse(token)
        this.setState({token: token})
    }
    render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen ${this.state.token.access_token}</Text>
      </View>
    )
  }
}