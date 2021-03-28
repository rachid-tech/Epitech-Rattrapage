import * as React from 'react';
import { Auth, getFavorites } from './imgurAPI';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/home'
import Profil from '../screens/profil'
import Search from '../screens/search'
import Favourite from '../screens/favourites'

function myTabs({ route }) {

    const Tab = createBottomTabNavigator();
    return (
        // <View
        // style={{
        //   flex: 1,
        //   justifyContent: "center",
        //   alignItems: "center"
        // }}>
      <Tab.Navigator>
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="profil" component={Profil} />
        <Tab.Screen name="search" component={Search} />
        <Tab.Screen name="favourites" component={Favourite} />
      </Tab.Navigator>
        // <Text>Hello, world!!!</Text>
    //   </View>
    );
}

export default myTabs;