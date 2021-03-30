import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, FlatList, Dimensions, RefreshControl, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenDimensions = Dimensions.get("screen");
import axios from 'axios'


export default class Favourite extends Component {
    state = {
        token: {},
        photos: []
    
    }


    componentWillUnmount() {
        this.focus();
      }

    async componentDidMount(){
        this.focus = this.props.navigation.addListener('focus', async () => {
            // do something
            var pics = await (
                axios(`https://api.imgur.com/3/account/${this.state.token.account_username}/favorites/`, {
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
        var token = await AsyncStorage.getItem("token")
        token = JSON.parse(token)
        this.setState({token: token})

        var pics = await (
            axios(`https://api.imgur.com/3/account/${this.state.token.account_username}/favorites/`, {
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
            return null;
        } else {
            // console.log(pics[0].link)
            this.setState({photos: pics})
            // return pics;
        }
    }

    isfavorite(link, index) {
        //https://api.imgur.com/3/image/{{imageHash}}/favorite
        axios("https://api.imgur.com/3/image/"+ link +"/favorite", {
            method: 'POST',
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
    
        var state = this.state
        if (state.isFavorite === "favorite") {
            state.photos[index].favorite = true
            state.isFavorite = "enleve"
        }
        else {
            state.photos[index].favorite = false
            state.isFavorite = "favorite"
            
        }
        this.setState(state)
        console.log(link)
        
    }

    render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Favourite Screen</Text>
        {this.state.photos[0] != null && console.log(this.state.photos[0].link)}
        {/* <Image source={{uri:JSON.parse(this.state.photos[0]).link}}/> */}
        {/* { this.state.photos[0] != null && <Image style={{height: 200, width: 200}} source={{uri: this.state.photos[0].link}}/>} */}
        <FlatList
                    data={this.state.photos}
                    renderItem={({ item , index}) => 
                    item.cover !== undefined ? 
                    <View>
                        <Image style={{height: 200, width: 200}} source={{uri: "https://i.imgur.com/" + item.cover + ".jpg" }}/>
                        <Text style={{flex: 1, margin: 5, marginLeft: 10, fontSize: 16, fontWeight: "bold",}}>{item.title}</Text>
                        <TouchableOpacity onPress={() => {this.isfavorite(item.cover, index)}} style={styles.Fav}>
                            <Text style={styles.appButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                    : <React.Fragment />    
                }
                />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    appButtonText: {
        fontSize: 14,
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      Fav: {
        elevation: 8,
        backgroundColor: "#F6FF33",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 30,
        width: 100,
        marginRight: 5
      }
  });