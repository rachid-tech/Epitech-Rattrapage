import * as React from 'react'
import {StyleSheet,View, Text, Platform} from "react-native" ;
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default class Upload extends React.Component {
    state = {
        token: {}
    }
    async componentDidMount(){
        var token = await AsyncStorage.getItem("token")
        token = JSON.parse(token)
        this.setState({token: token})
    }
    

    async request () {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        }
    

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        
    }

    render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          
      </View>
    )
  }
}