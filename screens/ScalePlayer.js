import React from 'react';

import { View, StyleSheet } from 'react-native';


import { Audio } from 'expo-av';
import { IconButton } from 'react-native-paper';

export default function ScalePlayer() {

  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../assets/foo.mp3'));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  return (
    <View style={styles.flexHorizontal}>
      <IconButton icon="skip-previous" size={30} onPress={playSound}> </IconButton>

      <IconButton icon="play" size={50} onPress={playSound} mode="contained"> </IconButton>
      <IconButton icon="skip-next" size={30} onPress={playSound}> </IconButton>
    </View>
  )
}

const styles = StyleSheet.create({
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});