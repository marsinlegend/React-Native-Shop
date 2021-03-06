import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const NavOpt = {
  default: {
    headerStyle: {
      backgroundColor:
        Platform.OS === 'android' ? Colors.defaultPrimary : '',
    },
    headerTintColor:
      Platform.OS === 'android'
        ? Colors.textPrimary
        : Colors.darkPrimary,
    headerTitleStyle: {
      fontFamily: 'Fonts_700',
    },
  },
};

export default NavOpt;
