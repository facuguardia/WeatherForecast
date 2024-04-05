import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View className="flex-1 relative">
      <StatusBar barStyle={'light-content'} />
      <Text>HomeScreen</Text>
      <Image
        blurRadius={70}
        source={require('../assets/images/bg-app.jpg')}
        className="absolute h-full w-full"
      />

      <View className="absolute h-full w-full bg-black opacity-60" />
      <View className="absolute h-full w-full flex items-center justify-center">
        <Text className="text-white text-3xl font-bold">Weather Forecast</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
