import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';;

import Theme from './Theme';

import TrainingScreen from './screens/TrainingScreen';

export default function App() {

  const isDarkModeOn = true; // TODO

  return (
    <PaperProvider theme={Theme}>
      <View style={styles.container}>
        <TrainingScreen />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.background,
  },
});