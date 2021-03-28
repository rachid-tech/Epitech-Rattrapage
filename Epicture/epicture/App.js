import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginWebView from './screens/loginWebview';
import myTabs from './src/myTabs';

const stackNavigator = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stackNavigator.Navigator>
        <stackNavigator.Screen name="Authenticate on Imgur" component={LoginWebView} />
        <stackNavigator.Screen name="Epicture" component={myTabs} />
      </stackNavigator.Navigator>
    </NavigationContainer>
  );
}