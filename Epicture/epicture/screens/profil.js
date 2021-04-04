import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, FlatList, Dimensions, RefreshControl, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default class Profil extends Component {
    state = {
        token: {},
        photos: []
    
    }

    componentWillUnmount() {
        this.focus();
      }
      
      async componentDidMount(){
        var token = await AsyncStorage.getItem("token")
        token = JSON.parse(token)
        this.setState({token: token})
        this.focus = this.props.navigation.addListener('focus', async () => {
            // do something
            var pics = await (
                axios(`https://api.imgur.com/3/account/${this.state.token.account_username}/images/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${this.state.token.access_token}`
                    }
                })
                .then((response) => {
                    // console.log(response)
                    if (response.data.success == true) {
                        return response.data.data;
                    } else {
                        return null;
                    }
                })
                .catch((error) => console.error(error))
            );    
            if (pics[0] == null) {
                console.log("No pics founded");
                return null;
            } else {
                // console.log(pics[0].link)
                this.setState({photos: pics})
                // return pics;
            }
        
        });

        var pics = await (
            axios(`https://api.imgur.com/3/account/${this.state.token.account_username}/images/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.state.token.access_token}`
                }
            })
            .then((response) => {
                // console.log(response)
                if (response.data.success == true) {
                    return response.data.data;
                } else {
                    return null;
                }
            })
            .catch((error) => console.error(error))
        );
        console.log("igooooooooooooooooooooo")
        if (pics[0] == null) {
            console.log("No pics founded");
            return null;
        } else {
            console.log("Pics founded");
            // console.log(pics[0].link)
            this.setState({photos: pics})
            // return pics;
        }
    }



    render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#707070', marginTop: 40 }}>
        <Text>Profil Screen</Text>
        {/* {this.state.photos[0] != null && console.log(this.state.photos[0].link)} */}
        {/* <Image source={{uri:JSON.parse(this.state.photos[0]).link}}/> */}
        {/* { this.state.photos[0] != null && <Image style={{height: 200, width: 200}} source={{uri: this.state.photos[0].link}}/>} */}
        <FlatList
                    data={this.state.photos}
                    renderItem={({ item }) => 
                    <View>
                        <Image style={{height: 200, width: 200}} source={{uri: item.link}}/>
                        <Text style={{flex: 1, margin: 5, marginLeft: 10, fontSize: 16, fontWeight: "bold",}}>{item.title}</Text>

                        {/* <Text style={styles.title}>{item.title}</Text> */}
                    </View>}
                />  
      </View>
    )
  }
}