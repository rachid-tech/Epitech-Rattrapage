import * as React from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

let isAuthentified = false;

function isConnected (imgurAuth) {
    if (imgurAuth.access_token && imgurAuth.expires_in && imgurAuth.refresh_token)
        return (true);
    return (false);
}

function parseURLParams (url) {
    let regex = /[?&#]([^=#]+)=([^&#]*)/g,
        params = {},
        match
    while ((match = regex.exec(url))) {
        params[match[1]] = match[2]
    }
    return (params);
}

function onNavigationStateChange (navigationState, navigation) {

    const url = navigationState.url
    const imgurAuth = parseURLParams(url);

    
    if (isConnected(imgurAuth) == true && isAuthentified == false) {
        isAuthentified = true;
            AsyncStorage.setItem("token", JSON.stringify(imgurAuth)).then((value) => {
            console.log(imgurAuth)
            navigation.reset({
                index: 1,
                routes: [{ name: 'Epicture', params: {auth: imgurAuth}}],
            });
            });
    }
};

function Login ({ navigation }) {

    return (
      <WebView
        scalesPageToFit
        source={{ uri: `https://api.imgur.com/oauth2/authorize?client_id=81e22870b5e605b&response_type=token&state=APPLICATION_STATE` }}
        onNavigationStateChange={nav => {
            onNavigationStateChange(nav, navigation)
        }}
      />
  )
};

export default Login;