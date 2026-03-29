import axios from 'axios';

const API = axios.create({
  // Check if the app is running in production mode (Vercel)
  baseURL: import.meta.env.PROD 
    ?  'https://e-commerce-store-1-yokn.onrender.com/api' // Replace with your actual Render URL
    : 'http://localhost:5000/api',
});

export default API;