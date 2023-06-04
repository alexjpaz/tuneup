
import React from 'react';
import './App.css';
import DrillList from './DrillList';
import MidiPlayer from './MidiPlayer';

import MainDrawer from './Drawer';

import { Container } from '@mui/system';
import { Paper } from '@mui/material';

function MainScreen() {

    const [state, setState] = React.useState();

    const onSelected = (action) => {
        setState(action.drill.data);

    };

    return (
        <>
            <MainDrawer />
            <Container maxWidth="sm" style={styles.container} data-testid="main-container">
                <Paper sx={styles.topFlex} elevation={2}>
                    <MidiPlayer src={state} />
                </Paper>
                <Paper sx={styles.bottomFlex} elevation={12}>
                    <DrillList onSelected={onSelected} />
                </Paper>
            </Container>
        </>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 0,

    },
    topFlex: {
        flex: 4, 
        overflow: "hidden", 
        display: "flex",
    },
    bottomFlex: {
        flex: 5, 
        overflow: "auto",

    },
    menu: {
        position: "fixed",
        left: "1rem",
        top: "1rem",
    }
}

export default MainScreen;
