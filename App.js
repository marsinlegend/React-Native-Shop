import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import ProductsNavigator from './navigation/ShopNavigator';
import {
  BalsamiqSans_400Regular,
  BalsamiqSans_700Bold,
  useFonts,
} from '@expo-google-fonts/balsamiq-sans';
import { AppLoading } from 'expo';

export default function App(props) {
  const [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
    BalsamiqSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ProductsNavigator />
      </NavigationContainer>
    </Provider>
  );
}
