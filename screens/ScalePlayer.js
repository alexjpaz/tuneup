import React, { useContext } from 'react';

import { View, StyleSheet } from 'react-native';


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
        <ProgressBar progress={0.1} />
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
  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});