import React from 'react';
import {
  Image,
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import s from './styles';
import Card from '../../UI/Card/Card';

const ProductItem = ({ title, price, image, onSelect, children }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={s.product}>
      <View>
        <TouchableCmp onPress={onSelect} useForeground>
          <View style={s.touchable}>
            <View style={s.imgContainer}>
              <Image
                style={s.img}
                source={{ uri: `http://192.168.42.214:5000/${image}` }}
              />
            </View>

            <View style={s.details}>
              <Text style={s.title}>{title}</Text>
              <Text style={s.price}>${price.toFixed(2)}</Text>
            </View>

            <View style={s.actions}>{children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

export default ProductItem;
