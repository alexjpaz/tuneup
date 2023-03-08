import React, { useContext, useState } from "react";

import { Audio } from "expo-av";
import { IconButton } from "react-native-paper";
import { TrainingScreenContext } from "./TrainingScreenContext";

export default function ScalePlayerPlayButton() {
    const [sound, setSound] = useState();

    const ctx = useContext(TrainingScreenContext);

    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(ctx.currentDrill.mediaUrl);
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
    }


  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Soun2d');
          
          sound.stopAsync();
        }
      : undefined;
  }, [ctx.currentDrill, sound]);
  
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