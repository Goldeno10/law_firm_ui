import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptors for error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);