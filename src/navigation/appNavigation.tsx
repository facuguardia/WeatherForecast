import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { SunIcon, StarIcon } from '@heroicons/react/16/solid';

const Tab = createBottomTabNavigator();

LogBox.ignoreLogs(['Setting a timer']);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'black',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarIconStyle: {
            display: 'none',
          },
        }}>
        <Tab.Screen name="Weather Forecast" component={HomeScreen}  />
        <Tab.Screen name="Favorite Cities" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
