import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'Fonts_400',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'Fonts_700',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default styles;
