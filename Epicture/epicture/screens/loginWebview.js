import * as React from 'react';
import { WebView } from 'react-native-webview';
import { isAuthentifiedToImgur, clientId } from '../src/imgurAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

let isAuthentified = false;

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

    // const [token, setToken] = React.useState("")
    
    if (isAuthentifiedToImgur(imgurAuth) == true && isAuthentified == false) {
        isAuthentified = true;
            AsyncStorage.setItem("token", JSON.stringify(imgurAuth)).then((value) => {//faire json.parse quand je vais get le token
            //   if (value) {
            //     setToken(value);
            //     }
            console.log(imgurAuth)
            navigation.reset({
                index: 1,
                routes: [{ name: 'Epicture', params: {auth: imgurAuth}}],
            });
            });
    }
};


function LoginWebView ({ navigation }) {

    return (
      <WebView
        // incognito={true}
        scalesPageToFit
        source={{ uri: `https://api.imgur.com/oauth2/authorize?client_id=edba6e817df751a&response_type=token&state=APPLICATION_STATE` }}
        onNavigationStateChange={navigationState => {
            onNavigationStateChange(navigationState, navigation)
        }}
      />
  )
};

export default LoginWebView;