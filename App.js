import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ScalePlayer from './ScalePlayer';
import AppBar from './AppBar';
import VowelChart from './VowelChart';

export default function App() {
  return (
    <PaperProvider>
      <AppBar />
      <View style={styles.container}>
        <VowelChart />
      </View>
      <View style={styles.containerFlex}>
       
        <StatusBar style="auto" />
        <ScalePlayer />
      </View>
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