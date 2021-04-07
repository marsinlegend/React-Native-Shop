import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocale = async (itemName, item) => {
  try {
    await AsyncStorage.setItem(itemName, JSON.stringify(item));
  } catch (err) {
    console.log(err);
  }
};

export const getLocale = async (itemName) => {
  try {
    return await JSON.parse(AsyncStorage.getItem(itemName));
  } catch (err) {
    console.log(err);
  }
};

export const removeLocale = async (itemName) => {
  try {
    await AsyncStorage.removeItem(itemName);
  } catch (err) {
    console.log(err);
  }
};
