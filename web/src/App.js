
import React from 'react';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { indigo, pink } from '@mui/material/colors';

import MainScreen from './MainScreen';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: indigo,
    secondary: pink,
    // background: {
    //  default: indigo[500]
    // },
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <MainScreen />
      </CssBaseline>
    </ThemeProvider >
  );
}

export default App;
