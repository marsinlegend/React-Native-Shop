import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import { askAsync, CAMERA, MEDIA_LIBRARY } from 'expo-permissions';
import s from './styles';
import Colors from '../../../constants/Colors';

const ImagePicker = ({ id, initPhoto, onInput }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(initPhoto);

  const verifyPermissions = async () => {
    const { status } = await askAsync(CAMERA, MEDIA_LIBRARY);
    if (status !== 'granted') {
      alert(
        'Sorry, we need camera roll permissions to make this work!',
      );
      return false;
    }
    return true;
  };

  const pickImageHandler = async ({ camera }) => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const imgOpts = {
      mediaTypes: ImgPicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    };

    const resImage = camera
      ? await ImgPicker.launchCameraAsync(imgOpts)
      : await ImgPicker.launchImageLibraryAsync(imgOpts);

    if (!resImage.cancelled) {
      setPreviewUrl(resImage.uri);

      const uri = resImage.uri;
      const name = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(name);
      const type = match ? `image/${match[1]}` : `image`;

      setFile({ uri, name, type });
    }
  };

  useEffect(() => {
    if (file) {
      onInput(id, file, true);
    }
  }, [file, onInput]);

  return (
    <View style={s.imagePicker}>
      <View style={s.imagePreview}>
        {previewUrl ? (
          <Image style={s.image} source={{ uri: previewUrl }} />
        ) : (
          <Text>No image picked yet.</Text>
        )}
      </View>

      <View style={s.actionButtons}>
        <Button
          title="Take Photo"
          color={Colors.defaultPrimary}
          onPress={pickImageHandler.bind(this, { camera: true })}
        />
        <Button
          title="Open Gallery"
          color={Colors.defaultPrimary}
          onPress={pickImageHandler}
        />
      </View>
    </View>
  );
};

export default ImagePicker;
