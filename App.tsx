import React from 'react';
import {SafeAreaView, StatusBar, View, Text} from 'react-native';

function App() {
  return (
    <SafeAreaView>
      <StatusBar />
      <View className='bg-black w-full h-full flex justify-center items-center'>
        <Text className='text-white'>App</Text>
      </View>
    </SafeAreaView>
  );
}
export default App;
