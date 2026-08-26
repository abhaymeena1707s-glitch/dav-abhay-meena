import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    const adminData = localStorage.getItem('adminInfo');
    if (adminData) {
      const parsedData = JSON.parse(adminData);
      if (parsedData.token) {
        config.headers.Authorization = `Bearer ${parsedData.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
