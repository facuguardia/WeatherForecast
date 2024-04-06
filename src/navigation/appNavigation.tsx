import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

LogBox.ignoreLogs(['Setting a timer']);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#2c3e50',
            paddingTop: 3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            paddingBottom: 5,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Weather Forecast') {
              iconName = 'cloud';
            } else if (route.name === 'Favorite Cities') {
              iconName = 'heart';
            }

            return <Entypo name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Weather Forecast" component={HomeScreen} />
        <Tab.Screen name="Favorite Cities" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
