import React from "react";

import MainDrawer from "./Drawer";

import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Paper, Box, Stack, Pagination } from '@mui/material';


import database from './database-legacy.json';

function LegacyDisplay({ scale }) {

    return (
        <Typography fontSize="1.75rem" textAlign={"center"} variant="body1">{scale.label}</Typography>
    );
}

function LegacyControls({ scale }) {
    return (
        <Box>
            <audio src={`/media/${scale.value}`} controls></audio>
        </Box>
    )
}

function LegacyScreen() {
    const scales = database.guided.scales;

    const [scale, setScale] = React.useState(scales[0]);

    const handlePageChange = (ev, page) => {
        setScale(scales[page - 1]);
    };

    return (
        <>
            <MainDrawer />
            <Container maxWidth="sm" style={styles.container} data-testid="main-container">
                <Paper sx={styles.topFlex} elevation={2}>
                    <LegacyDisplay scale={scale} />
                </Paper>
                <Paper sx={styles.bottomFlex} elevation={12}>
                    <LegacyControls scale={scale} />
                    <Box>

                    </Box>
                </Paper>
                <Paper sx={styles.bottomFlex} elevation={12}>
                    <Stack spacing={2}>
                        <Pagination count={scales.length} onChange={handlePageChange} />
                    </Stack>
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
        paddingTop: "5vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomFlex: {
        flex: 5,
        overflow: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}


export default LegacyScreen;