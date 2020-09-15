// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import SearchScreen from './screens/SearchScreen';
//
// const stackNavigator = createStackNavigator(
//   { Search: SearchScreen },
//   {
//     initialRouteName: 'Search',
//     defaultNavigationOptions: {
//       title: 'Business Search',
//     },
//   },
// );

// export default createAppContainer(stackNavigator);
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import ProductsNavigator from './navigation/ShopNavigator';

export default function App(props) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ProductsNavigator />
      </NavigationContainer>
    </Provider>
  );
}
