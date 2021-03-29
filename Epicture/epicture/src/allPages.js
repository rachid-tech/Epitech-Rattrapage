import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home'
import Profil from '../screens/profil'
import Search from '../screens/search'
import Favourite from '../screens/favourites'
import Upload from '../screens/upload'

function AllPages({ route }) {

    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator>
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="profil" component={Profil} />
        <Tab.Screen name="search" component={Search} />
        <Tab.Screen name="favourites" component={Favourite} />
        <Tab.Screen name="upload" component={Upload}/>
      </Tab.Navigator>
    );
}

export default AllPages;