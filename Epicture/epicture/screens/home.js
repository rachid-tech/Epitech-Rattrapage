import React, { Component } from 'react'
import { StyleSheet, View, TextInput, FlatList, Dimensions, Text, Image, RefreshControl, ShadowPropTypesIOS, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Icon } from 'react-native-elements'
import { Button } from 'react-native-elements';
// import { Button } from 'react-native-paper';

export default class Home extends Component {
    state = {
        token: {},
        searchValue: "",
        photos: [],
        isFavorite: "favorite",
    }
    async componentDidMount(){
        var token = await AsyncStorage.getItem("token")
        token = JSON.parse(token)
        this.setState({token: token})

    }

    render() {
    return (
      <View >
          
      <FlatList
                    data={this.state.photos}
                    renderItem={({ item, index }) => 
                    item.cover !== undefined ? 
                    <View>
                        <Image style={{height: 200, width: 200}} source={{uri: "https://i.imgur.com/" + item.cover + ".jpg" }}/>
                        <Text style={{flex: 1, margin: 5, marginLeft: 10, fontSize: 16, fontWeight: "bold",}}>{item.title}</Text>
                        </View> 
                    : <React.Fragment />
                }
                />
      </View>
    )
  }
}