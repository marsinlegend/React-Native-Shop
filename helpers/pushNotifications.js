import { askAsync, getAsync, NOTIFICATIONS } from 'expo-permissions';
import {
  AndroidImportance,
  getExpoPushTokenAsync,
  setNotificationChannelAsync,
} from 'expo-notifications';
import { Platform } from 'react-native';
import axios from 'axios';

export const registerPushNotifications = async () => {
  let pushToken;
  let permission = await getAsync(NOTIFICATIONS);
  if (permission.status !== 'granted') {
    permission = await askAsync(NOTIFICATIONS);
  }
  pushToken =
    permission.status !== 'granted'
      ? null
      : (await getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    console.log('setNotification');
    await setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return pushToken;
};

export const sendPushNotification = (pushToken, title, body) => {
  return axios.post('https://exp.host/--/api/v2/push/send', {
    to: pushToken,
    title,
    body,
  });
};
