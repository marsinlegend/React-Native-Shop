import axios from 'axios';
import { apiUrl as url } from './urls';

export const Api = {
  createProduct(body) {
    console.log(body);
    return axios.post(url.PRODUCTS, body);
  },
  fetchProducts() {
    return axios.get(url.PRODUCTS);
  },
};
