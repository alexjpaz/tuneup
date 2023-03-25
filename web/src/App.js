
import React from 'react';
import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';

import MainScreen from './MainScreen';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <MainScreen />
      </CssBaseline>
    </ThemeProvider >
  );
}

export default App;
