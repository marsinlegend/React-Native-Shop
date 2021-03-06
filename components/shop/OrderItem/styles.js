import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: 'Fonts_700',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Fonts_400',
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});

export default styles;
