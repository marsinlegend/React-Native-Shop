import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import {
  BalsamiqSans_400Regular as Fonts_400,
  BalsamiqSans_700Bold as Fonts_700,
  useFonts,
} from '@expo-google-fonts/balsamiq-sans';
import AppLoading from 'expo-app-loading';
import ShopDrawerNavigator from './navigation/ShopDrawerNavigator';

export default function App(props) {
  const [fontsLoaded] = useFonts({
    Fonts_400,
    Fonts_700,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <ShopDrawerNavigator />
    </Provider>
  );
}
