import React from 'react';

import { View, StyleSheet } from 'react-native';


import { Audio } from 'expo-av';
import { IconButton, ProgressBar } from 'react-native-paper';
import ScalePlayerPlayButton from './ScalePlayerPlayButton';
import ScalePlayerBottom from './ScalePlayerBottom';

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
    <>
      <View style={styles.progressBar}>
        <ProgressBar progress={0.1} />
      </View>
      <View style={styles.flexHorizontal}>
        <IconButton icon="skip-previous" size={30} onPress={playSound}> </IconButton>
        <ScalePlayerPlayButton />
        <IconButton icon="skip-next" size={30} onPress={playSound}> </IconButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    flex: 0.25,
  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});