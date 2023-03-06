import React from 'react';

import { View } from 'react-native';

import { Button } from 'react-native-paper';

import { Audio } from 'expo-av';

export default function ScalePlayer() {

    const [sound, setSound] = React.useState();

    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync( require('./assets/foo.mp3') );
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
        <View>
        <Button icon="camera" mode="contained" onPress={playSound}>
    Press me
  </Button>
        <Button title="Play Sound" onPress={playSound} />
        </View>
    )
}