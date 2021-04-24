import axios from 'axios';
import { apiUrl as url } from './urls';

const axiosApi = axios.create({
  baseURL: 'http://192.168.1.4:5000',
});

export const Api = {
  createProduct(body) {
    return axiosApi.post(url.PRODUCTS, body);
  },
  fetchProducts() {
    return axiosApi.get(url.PRODUCTS);
  },
  updateProductById({ id, body }) {
    return axiosApi.patch(`${url.PRODUCTS}/${id}`, body);
  },
  deleteProduct(id) {
    return axiosApi.delete(`${url.PRODUCTS}/${id}`);
  },
  createOrder(body) {
    return axiosApi.post(url.ORDERS, body);
  },
  fetchOrders() {
    return axiosApi.get(url.ORDERS);
  },
  signup(body) {
    return axiosApi.post(url.SIGNUP, body);
  },
  login(body) {
    return axiosApi.post(url.LOGIN, body);
  },
};
