import React, { useContext, useState } from "react";

import { Audio } from "expo-av";
import { IconButton } from "react-native-paper";
import { TrainingScreenContext } from "./TrainingScreenContext";

export default function ScalePlayerPlayButton() {
  const [sound, setSound] = useState();

  const [isPlaying, setIsPlaying] = useState();

  const ctx = useContext(TrainingScreenContext);

  async function onPress() {
    if(isPlaying) {
      sound.stopAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(ctx.currentDrill.mediaUrl);

      setSound(sound);

      await sound.playAsync();
    }
  }


  React.useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.isPlaying) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      });
    }

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

  const icon = isPlaying ? "pause" : "play";

  return (
    <IconButton icon={icon} size={50} onPress={onPress} mode="contained"> </IconButton>
  );
}