// apiService.js
import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('Authorization');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const profileGet = async (endpoint) => {
  try {

    const token = localStorage.getItem('Authorization');

    const response = await api.get(endpoint);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message || error);
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

export const logout = async (endpoint) => {
  try {
    const response = await postData(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const postData = async (endpoint, payload, headers = {}) => {
  try {
    const response = await api.post(endpoint, payload);

    console.log('Response:', response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
    } else {
      console.error('Error Message:', error.message);
    }
    throw error;
  }
};

