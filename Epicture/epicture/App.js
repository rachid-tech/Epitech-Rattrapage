import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Login from './screens/Login';
import AllPages from './src/allPages';

const nav = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <nav.Navigator screenOptions={{headerShown: false }}>
        <nav.Screen name="Authenticate on Imgur" component={Login} />
        <nav.Screen name="Epicture" component={AllPages}/>
      </nav.Navigator>
    </NavigationContainer>
  );
}