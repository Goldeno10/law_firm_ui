import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Crucial for handling Cookies/CORS if we add them later
});

// Optional: Add interceptors for error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);