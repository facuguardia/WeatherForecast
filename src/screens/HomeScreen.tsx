import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../theme';

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([
    'Medellin, Colombia',
    'Buenos Aires, Argentina',
    'Santiago, Chile',
    'Lima, Peru',
  ]);

  const toggleSearch = (value: boolean) => {
    setShowSearch(value);
  };

  const handleLocation = (location: string) => {
    console.log('location', location);
    toggleSearch(false);
  };

  return (
    <View className="flex-1 relative">
      <StatusBar barStyle={'light-content'} />
      <Text>HomeScreen</Text>
      <Image
        blurRadius={70}
        source={require('../assets/images/bg-app.jpg')}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        {/* search */}
        <View className="relative h-[7%] rounded-full mx-4 z-50">
          <View
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
            }}
            className="flex-row justify-end items-center rounded-full">
            {showSearch ? (
              <TextInput
                placeholder="Search city"
                placeholderTextColor="white"
                className="flex-1 h-10 pl-6 text-base"
              />
            ) : null}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{backgroundColor: theme.bgWhite(0.3)}}
              className="p-3 m-1 rounded-full">
              {/* TODO: Instalar icono de search, la libreria de heroicons no esta funcionando  */}
              <Text>icon</Text>
            </TouchableOpacity>

            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full top-16 bg-gray-300 rounded-3xl">
                {locations.map((location, index) => {
                  let showBorder = index + 1 != locations.length;
                  let borderClass = showBorder
                    ? 'border-b-2 border-b-gray-400'
                    : '';

                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(location)}
                      key={index}
                      className={
                        'flex-row items-center border-0 p-3 px-4 mb-1 ' +
                        borderClass
                      }>
                      {/* TODO: Instalar icono de location, la libreria de heroicons no esta funcionando  */}
                      <Text className="text-black text-lg ml-2">
                        {location}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
        </View>

      {/* forecast section */}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
