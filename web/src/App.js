
import React from 'react';
import './App.css';
import DrillList from './DrillList';
import MidiPlayer from './MidiPlayer';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { indigo, pink } from '@mui/material/colors';

import { Box, IconButton, Paper } from '@mui/material';
import { Container } from '@mui/system';
import { Menu as MenuIcon } from '@mui/icons-material';

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

  const [state, setState] = React.useState();

  const onSelected = (action) => {
    setState(action.drill.data);

  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Box sx={{position: "fixed", left: "1rem", top: "1rem"}}>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
        <Container maxWidth="sm" style={styles.container}>
          <Paper sx={{flex: 4, overflow: "hidden", display: "flex"}} elevation={2}>
            <MidiPlayer src={state} />
          </Paper>
          <Paper sx={{flex:  5, overflow: "auto"}} elevation={12}>
            <DrillList onSelected={onSelected} />
          </Paper>
        </Container>

      </CssBaseline>
    </ThemeProvider >
  );
}


/*
<Paper style={styles.player}>
              <MidiPlayer src={state} />
            </Paper>
            <Paper style={styles.list}>
            </Paper>
*/

const styles = {
  container: {
     height: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: 0,
    
  },
  flex: {
    display: "flex",

  },
  flexChild: {
    flex: 1,
  },

  player: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: 'auto'
  }
}

export default App;
