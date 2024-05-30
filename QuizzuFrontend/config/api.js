import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const local='http://localhost:8080';
const ip='http://192.168.81.55:8080';
//192.168.0.231
export const api = axios.create({
  baseURL: ip,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (data) => {
  try {
    console.log(data)
    const response = await api.post('/api/v1/auth/register', data);
    console.log("success")
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message==="User already exists") {
      throw new Error("User already exists, try with a different email")
    } else {
      throw new Error(error);
    }
  }
};

export const signIn = async (data) => {
  try {
    console.log(data)
    const response = await api.post('/api/v1/auth/authenticate', data);
    const accessToken = response.data.accessToken;
    await AsyncStorage.setItem('userToken', accessToken);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message==="Invalid username or password") {
      throw new Error(error.response.data.message);
    } else {
      Alert.alert('Something went wrong. Please try again.')
    }
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/category/getCategories');
    return response.data;
  } catch (error) {
    if(error.response && error.response.data)
      {
        throw new Error(error.response.data.message);
      } else {
        Alert.alert('Something went wrong. Please try again.')
      }
  }
}

export const searchByCategory = async (query) => {
  try {
    console.log("api : " + query)
    const response = await api.get('/category/searchCategory', {
      params: {searchQuery: query}
    });
    return response.data;
  } catch (error) {
    Alert.alert('something went wrong. Pleare try again.')  
  } 
}