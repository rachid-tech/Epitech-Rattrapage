import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Login from './screens/Login';
import AllPages from './src/allPages';

const stackNavigator = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stackNavigator.Navigator>
        <stackNavigator.Screen name="Authenticate on Imgur" component={Login} />
        <stackNavigator.Screen name="Epicture" component={AllPages} />
      </stackNavigator.Navigator>
    </NavigationContainer>
  );
}