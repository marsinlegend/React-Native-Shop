import * as SecureStore from 'expo-secure-store';

export const Storage = {
  async getData(key) {
    return JSON.parse(await SecureStore.getItemAsync(key));
  },
  setData(key, data) {
    return SecureStore.setItemAsync(key, JSON.stringify(data));
  },
  clearData(key) {
    return SecureStore.deleteItemAsync(key);
  },
};
