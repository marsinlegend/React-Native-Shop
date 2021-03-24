import axios from 'axios';
import { apiUrl as url } from './urls';

export const Api = {
  createProduct(body) {
    return axios.post(url.PRODUCTS, body);
  },
  fetchProducts() {
    return axios.get(url.PRODUCTS);
  },
  updateProductById({ id, ...body }) {
    return axios.patch(`${url.PRODUCTS}/${id}`, body);
  },
  deleteProduct(id) {
    return axios.delete(`${url.PRODUCTS}/${id}`);
  },
};
