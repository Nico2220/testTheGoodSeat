import axios from 'axios';
const BASE_API_URL = 'https://api.external.thegoodseat.fr';

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,

  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '8k5jqE35yN3yVUaxFP824FOq8oJeLyr3bVyiZmig',
  },
});
