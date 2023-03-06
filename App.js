import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ScalePlayer from './ScalePlayer';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <ScalePlayer />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242c40',
    alignItems: 'center',
    justifyContent: 'center',
  },
});