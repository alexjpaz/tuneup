import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import AppBar from './AppBar';
import VowelChart from './VowelChart';
import TrainingScreen from './screens/TrainingScreen';



export default function App() {
  return (
    <PaperProvider>
      <TrainingScreen />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  containerFlex: {
    flex: 1,
    // backgroundColor: '#242c40',
    alignItems: 'center',
    justifyContent: 'center',
  },
});