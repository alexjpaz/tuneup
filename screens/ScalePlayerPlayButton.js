import React from "react";

import { Audio } from "expo-av";
import { IconButton } from "react-native-paper";

export default function ScalePlayerPlayButton() {
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
        <IconButton icon="play" size={50} onPress={playSound} mode="contained"> </IconButton>
    );
}