import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, FlatList, Dimensions, RefreshControl, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenDimensions = Dimensions.get("screen");
import axios from 'axios'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nothing: {
        marginTop: 200,
        margin: 50,
        width: (screenDimensions.width - 250),
        height: (screenDimensions.height - 700),
    },
    item: {
        marginLeft: 5,
        marginRight: 5,
        width: (screenDimensions.width - 10),
        height: (screenDimensions.height - 400),
        borderColor: "#000000",
        borderWidth: 1,
    },
    title: {
        flex: 1,
        margin: 5,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default class Profil extends Component {
    state = {
        token: {},
        photos: []
    
    }
    async componentDidMount(){
        var token = await AsyncStorage.getItem("token")
        token = JSON.parse(token)
        this.setState({token: token})

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profil Screen</Text>
        {this.state.photos[0] != null && console.log(this.state.photos[0].link)}
        {/* <Image source={{uri:JSON.parse(this.state.photos[0]).link}}/> */}
        {/* { this.state.photos[0] != null && <Image style={{height: 200, width: 200}} source={{uri: this.state.photos[0].link}}/>} */}
        <FlatList
                    data={this.state.photos}
                    renderItem={({ item }) => 
                    <View>
                        <Image style={{height: 200, width: 200}} source={{uri: item.link}}/>
                        {/* <Text style={styles.title}>{item.title}</Text> */}
                    </View>}
                />
      </View>
    )
  }
}