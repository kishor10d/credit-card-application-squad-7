import axios from 'axios';

const BASE_URL = 'http://localhost';
const PORT = '3001';

const axiosClient = axios.create({
  baseURL: `${BASE_URL}:${PORT}`,
  headers: {
    'Content-Type': 'application/json'
  },
});

export default axiosClient;