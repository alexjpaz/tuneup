import React, { useContext } from 'react';

import { View, StyleSheet } from 'react-native';

import Slider from '@react-native-community/slider';

import { Audio } from 'expo-av';
import { IconButton, ProgressBar } from 'react-native-paper';
import ScalePlayerPlayButton from './ScalePlayerPlayButton';
import ScalePlayerBottom from './ScalePlayerBottom';
import { TrainingScreenContext } from './TrainingScreenContext';

export default function ScalePlayer() {

  const ctx = useContext(TrainingScreenContext);

  const nextDrill = () => {
    ctx.nextDrill();
  }

  const prevDrill = () => {
    ctx.prevDrill();
  }

  return (
    <>
      <View style={styles.progressBar}>

<Slider
  style={{width: 300, height: 40}}
  minimumValue={0}
  maximumValue={1}
  minimumTrackTintColor="#aaa"
  maximumTrackTintColor="#000000"
/>

      </View>
      <View style={styles.flexHorizontal}>
        <IconButton icon="skip-previous" size={30} onPress={prevDrill}> </IconButton>
        <ScalePlayerPlayButton />
        <IconButton icon="skip-next" size={30} onPress={nextDrill}> </IconButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    flex: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});