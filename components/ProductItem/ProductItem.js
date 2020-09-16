import React from 'react';
import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import s from './styles';
import Colors from '../../constants/Colors';

const ProductItem = ({
  title,
  price,
  image,
  onViewDetails,
  onAddToCard,
}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={s.product}>
      <View>
        <TouchableCmp onPress={onViewDetails} useForeground>
          <View style={s.touchable}>
            <View style={s.imgContainer}>
              <Image style={s.img} source={{ uri: image }} />
            </View>

            <View style={s.details}>
              <Text style={s.title}>{title}</Text>
              <Text style={s.price}>${price.toFixed(2)}</Text>
            </View>

            <View style={s.actions}>
              <Button
                color={Colors.defaultPrimary}
                title="View Details"
                onPress={onViewDetails}
              />
              <Button
                color={Colors.defaultPrimary}
                title="To Card"
                onPress={onAddToCard}
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

export default ProductItem;
