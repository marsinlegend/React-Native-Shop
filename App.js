import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import ProductsNavigator from './navigation/ShopNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    lato: require('./assets/fonts/Lato-Regular.ttf'),
    'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
  });
};

export default function App(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ProductsNavigator />
      </NavigationContainer>
    </Provider>
  );
}
