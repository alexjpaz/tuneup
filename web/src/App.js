
import React from 'react';
import './App.css';
import DrillList from './DrillList';
import MidiPlayer from './MidiPlayer';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { indigo, pink } from '@mui/material/colors';

import { Paper } from '@mui/material';
import { Container } from '@mui/system';

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

  const [state, setState] = React.useState("./test.mid");

  const onSelected = (action) => {
    setState(action.drill.data);

  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container maxWidth="sm" sx={{ padding: 0 }}>
            <Paper style={styles.player}>
              <MidiPlayer src={state} />
            </Paper>
            <Paper style={styles.list}>
              <DrillList onSelected={onSelected} />
            </Paper>
        </Container>
      </CssBaseline>
    </ThemeProvider >
  );
}

const styles = {
  App: {
    display: "flex",
    flexDirection: "column"
  },
  player: {

  },
  list: {
    maxHeight: "42vh", overflow: 'auto'
  }
}

export default App;
