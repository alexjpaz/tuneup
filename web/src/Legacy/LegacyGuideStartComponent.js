import React from "react";
import { Container } from '@mui/system';
import { Paper, Box, Button } from '@mui/material';
import { PlayCircle as PlayArrowIcon } from "@mui/icons-material";
import { styles } from "./LegacyScreen";

export function LegacyGuideStartComponent({ onClickStart = () => { } }) {

    return (
        <Container maxWidth="sm" style={styles.container} data-testid="main-container">
            <Paper sx={styles.bottomFlex} elevation={2}>
                <Box style={{ "alignSelf": "center" }}>
                    <Button variant="contained" size={"large"} color="secondary" startIcon={<PlayArrowIcon />} onClick={onClickStart}>
                        Start Guided Scales
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
