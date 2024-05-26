import axios from 'axios';

const api = axios.create({
  baseURL: 'localhost:8080',
});

export const signUp = async (data) => {
  try {
    const response = await api.post('/api/v1/auth/register', data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message==="User already exists") {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const signIn = async (data) => {
  try {
    const response = await api.post('/api/v1/auth/login', data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
