import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Button} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Picker = () => {
  const [avatar, setAvatar] = useState(null);

  const getAvatar = () => {
    launchImageLibrary(
      {
        noData: true,
        mediaType: 'mixed',
      },
      response => {
        if (response.didCancel) {
          console.log('user canceled');
        } else if (response.errorMessage) {
          console.log(response.errorMessage);
        } else {
          const source = {uri: 'data:image/jpeg;base64,' + response.assets[0]};

          console.log(source);
          const imageAssetsArray = response.assets[0].uri;
          console.log(imageAssetsArray);
          setAvatar(imageAssetsArray);
        }
      },
    );
  };

  const getCamera = () => {
    launchCamera(
      {
        noData: true,
        mediaType: 'mixed',
      },
      response => {
        if (response.didCancel) {
          console.log('user canceled');
        } else if (response.errorMessage) {
          console.log(response.errorMessage);
        } else {
          const source = {uri: 'data:image/jpeg;base64,' + response.assets[0]};

          console.log(source);
          const imageAssetsArray = response.assets[0].uri;
          console.log(imageAssetsArray);
          setAvatar(imageAssetsArray);
        }
      },
    );
  };

  return (
    <View>
      <Image source={{uri: avatar}} style={styles.avatar} />
      <Button title="Add your avatar" onPress={getAvatar} />
      <Button title="Launch Camera" onPress={getCamera} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: 400,
  },
});

export default Picker;
