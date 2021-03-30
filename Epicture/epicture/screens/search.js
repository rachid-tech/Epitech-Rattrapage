import React, { Component } from 'react'
import { StyleSheet, View, TextInput, FlatList, Dimensions, Text, Image, RefreshControl, ShadowPropTypesIOS, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Icon } from 'react-native-elements'
import { Button } from 'react-native-elements';
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

    vote(link, vote, obj) {
        //https://api.imgur.com/3/image/{{imageHash}}/favorite
        axios("https://api.imgur.com/post/v1/posts/" + link + "/favorite?client_id={client_id}", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.state.token.access_token}`
            }
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => console.error(error))
        console.log(obj.vote)   
    }

    upvote(link) {
//https://api.imgur.com/3/gallery/{{galleryHash}}/votes
    }

    render() {
    return (
      <View >
          <View style={{flexDirection:'row'}}>
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
                <TouchableOpacity onPress={() => this.activeSearch(this.state.searchValue)} style={styles.SearchButtonText}>
                    <Text>
                        search
                    </Text>
                </TouchableOpacity>
                </View>
      {/* <Button style={styles.SearchButtonText} title="button" onPress={() => this.activeSearch(this.state.searchValue)}>Search</Button> */}
      <FlatList
                    data={this.state.photos}
                    renderItem={({ item, index }) => 
                    item.cover !== undefined ? 
                    <View>
                        <Image style={{height: 200, width: 200}} source={{uri: "https://i.imgur.com/" + item.cover + ".jpg" }}/>
                        <Text style={{flex: 1, margin: 5, marginLeft: 10, fontSize: 16, fontWeight: "bold",}}>{item.title}</Text>
                        
                        <View style={{flexDirection:'row'}}>
                        
                        <TouchableOpacity onPress={() => {this.isfavorite(item.cover, index)}} style={styles.Fav}>
                            <Text style={styles.appButtonText}>{item.favorite ? "enleve" : "favorite"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {this.vote(item.cover, "up", item)}} style={styles.UPVote}>
                            <Text style={styles.appButtonText}>UP vote</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {this.vote(item.cover, "down", item)}} style={styles.DownVote}>
                            <Text style={styles.appButtonText}>Down</Text>
                        </TouchableOpacity>

                        </View> 
                    </View>
                    : <React.Fragment />
                }
                />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#FFF700",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      height: 20,
      width: 20,
      marginRight: 5
    },
    appButtonText: {
      fontSize: 14,
      color: "#000",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    SearchButtonText: {
        elevation: 8,
        backgroundColor: "#3374FF",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 40,
        width: 70,
        marginRight: 5
      },
      UPVote: {
        elevation: 8,
        backgroundColor: "#33FF3F",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 30,
        width: 100,
        marginRight: 5
      },
      DownVote: {
        elevation: 8,
        backgroundColor: "#FF3633",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 30,
        width: 100,
        marginRight: 5
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