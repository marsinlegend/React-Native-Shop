import axios from 'axios';
import { apiUrl as url } from './urls';

export const Api = {
  createProduct(body) {
    return axios.post(url.PRODUCTS, body);
  },
};
