// frontend/src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Update this to your backend's URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
