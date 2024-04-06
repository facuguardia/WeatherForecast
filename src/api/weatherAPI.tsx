import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiKey } from '../constants';

interface ForecastParams {
  cityName: string;
  days: number;
}

interface LocationsParams {
  cityName: string;
}

const forecastEndpoint = (params: ForecastParams): string =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationsEndpoint = (params: LocationsParams): string =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint: string): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response: AxiosResponse = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
};

export const fetchWeatherForecast = (params: ForecastParams): Promise<any> => {
  return apiCall(forecastEndpoint(params));
};

export const fetchLocations = (params: LocationsParams): Promise<any> => {
  return apiCall(locationsEndpoint(params));
};