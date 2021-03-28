import React, { Component } from 'react'
import { StyleSheet, View, TextInput, FlatList, Dimensions, Button, Text, Image, RefreshControl, ShadowPropTypesIOS, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
// import { Button } from 'react-native-paper';

export default class Search extends Component {
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

    async activeSearch(url) {
      var pics = await (
        axios("https://api.imgur.com/3/gallery/search/time/all/1?q=" + url, {
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

     onEndReached = () => {
        if (this.state.viral) {
            this.setState({
                viralPage: this.state.viralPage + 1
            })
            let section = "";
            let sort = "";
            if (this.state.viralPopular) {
                section = "hot";
                sort = "viral";
            } else if (this.state.viralNew) {
                section = "hot";
                sort = "top";
            } else if (this.state.userPopular) {
                section = "user";
                sort = "viral";
            } else if (this.state.userNew) {
                section = "user";
                sort = "top";
            }
            this.getGallery(section, sort);
        } else if (this.state.following) {
            this.setState({
                followingPage: this.state.followingPage + 1
            })
            this.getFollowingGallery();
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

    vote(link, index) {
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

    upvote(link) {
//https://api.imgur.com/3/gallery/{{galleryHash}}/votes
    }

    render() {
    return (
      <View >
                <TextInput
                    style={{marginLeft: 5,
                      marginRight: 5,
                      height: 50,
                      borderColor: "#000000",
                      borderWidth: 1,
                      paddingLeft: 5}}
                    placeholder="search a picture"
                    onChangeText={(text) => this.setState({searchValue: text})}
                />
      <Button style={{margin: 5}} title="button" onPress={() => this.activeSearch(this.state.searchValue)}>Search</Button>
      <FlatList
                    data={this.state.photos}
                    renderItem={({ item, index }) => 
                    item.cover !== undefined ? 
                    <View>
                        <Image style={{height: 200, width: 200}} source={{uri: "https://i.imgur.com/" + item.cover + ".jpg" }}/>
                        <Text style={{flex: 1, margin: 5, marginLeft: 10, fontSize: 16, fontWeight: "bold",}}>{item.title}</Text>
                        <TouchableOpacity onPress={() => {this.isfavorite(item.cover, index)}}>
                            <Text >{item.favorite ? "enleve" : "favorite"}</Text>
                        </TouchableOpacity>
                        <Button title="upvote"></Button>
                        <Button title="downvote"></Button>
                    </View>
                    : <React.Fragment />
                }
                />
      </View>
    )
  }
}