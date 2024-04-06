import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { theme } from '../theme';
import { fetchLocations, fetchWeatherForecast } from '../api/weatherAPI';
import { weatherImages } from '../constants/index';
import { getData, storeData } from '../utils/asyncStorage';

import { debounce } from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

interface Location {
  name: string;
  country: string;
}

interface Weather {
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    wind_kph: number;
    humidity: number;
  };
  location: {
    name: string;
    country: string;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        condition: {
          text: string;
        };
        avgtemp_c: number;
      };
    }[];
  };
}

const HomeScreen: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [weather, setWeather] = useState<Weather>({});
  const [loading, setLoading] = useState<boolean>(true);

  const handleSearch = (text: string) => {
    if (text.length > 2) {
      fetchLocations({ cityName: text }).then((data: Location[]) => {
        setLocations(data);
      });
    }
  };

  const toggleSearch = (value: boolean) => {
    setShowSearch(value);
  };

  const handleLocation = (loc: Location) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({ cityName: loc.name, days: 7 }).then((data: Weather) => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Argentina';

    if (myCity) {
      cityName = myCity;
    }

    fetchWeatherForecast({ cityName, days: 7 }).then((data: Weather) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;
  return (
    <View className="flex-1 relative">
      <StatusBar barStyle={'light-content'} />
      <Image
        blurRadius={70}
        source={require('../assets/images/bg-app.jpg')}
        className="absolute h-full w-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Text className="text-white text-2xl">Loading...</Text>
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* search */}
          <View className="relative h-[7%] rounded-full mx-4 z-50 mt-2">
            <View
              style={{
                backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
              }}
              className="flex-row justify-end items-center rounded-full">
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor="white"
                  className="flex-1 h-10 pl-6 text-base text-white"
                />
              ) : null}
              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={{ backgroundColor: theme.bgWhite(0.3) }}
                className="p-3 m-1 rounded-full">
                <AntDesign name="search1" size={20} color="white" />
              </TouchableOpacity>

              {locations?.length > 0 && showSearch ? (
                <View className="absolute w-full top-16 bg-gray-300 rounded-3xl">
                  {locations?.map((loc, index) => {
                    let showBorder = index + 1 !== locations.length;
                    let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';

                    return (
                      <TouchableOpacity
                        onPress={() => handleLocation(loc)}
                        key={index}
                        className={
                          'flex-row items-center border-0 p-3 px-4 mb-1 ' + borderClass
                        }>
                        <AntDesign name="enviromento" size={20} color="black" />
                        <Text className="text-black text-lg ml-2">
                          {loc?.name}, {loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
          </View>

          {/* forecast section */}
          <View className="mx-4 flex flex-1 justify-around mb-2 ">
            {/* location */}
            <Text className="text-white text-2xl font-bold text-center">
              {location?.name},
              <Text className="text-gray-300 text-lg font-semibold">
                {' '}
                {location?.country}
              </Text>
            </Text>

            {/* weather */}
            <View className="flex-row items-center justify-center">
              <Image
                source={weatherImages[current?.condition?.text]}
                className="w-52 h-52"
              />
            </View>

            {/* temp */}
            <View className="space-y-2">
              <Text className="text-white text-6xl font-bold text-center ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-white text-xl text-center -tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>

            {/* other stats*/}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Feather name="clock" size={20} color="white" />
                <Text className="text-white text-lg">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Feather name="wind" size={20} color="white" />
                <Text className="text-white text-lg">{current?.wind_kph} km/h</Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Feather name="cloud-snow" size={20} color="white" />
                <Text className="text-white text-lg">{current?.humidity} %</Text>
              </View>
            </View>
          </View>
          {/* forecast for next days */}
          <View className="mb-5 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <Entypo name="calendar" size={20} color="white" />
              <Text className="text-white text-base">Daily forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
              className="flex-row mx-4">
              {weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let options = { weekday: 'long' };
                let dayName = date.toLocaleString('en-US', options);
                dayName = dayName.split(',')[0];

                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{
                      backgroundColor: theme.bgWhite(0.15),
                    }}>
                    <Image
                      source={weatherImages[item?.day?.condition?.text]}
                      className="w-11 h-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeScreen;
