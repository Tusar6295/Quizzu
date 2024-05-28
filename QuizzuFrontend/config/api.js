import axios from 'axios';
import { Alert } from 'react-native';

const local='http://localhost:8080';
const ip='http://192.168.0.231:8080';

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
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message==="Invalid username or password") {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
