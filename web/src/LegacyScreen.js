import React from "react";

import MainDrawer from "./Drawer";

import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Paper, Box, Stack, Pagination } from '@mui/material';


import database from './database-legacy.json';

function LegacyDisplay({ scale, handleTouchEnd = () => {} }) {
    


    return (
        <Typography 
            fontSize="1.75rem" 
            textAlign={"center"} 
            variant="body1"
            >
            {scale.label}
            </Typography>
    );
}

function LegacyControls({ scale, handleTouchEnd = () => {} }) {

    return (
        <Box>
            <audio src={`/media/${scale.value}`} controls autoplay></audio>
        </Box>
    )
}

function LegacyScreen() {
    const scales = database.guided.scales;

    const [scale, setScale] = React.useState(scales[0]);

    const handleTouchEnd = (direction) => {
        let index = scales.indexOf(scale);

        if(direction === "right") {
            index--;
        }

        if(direction === "left") {
            index++;
        }

        let scale2 = scales[index];

        if(!scale2) {
            scale2 = scales[0];
        }

        setScale(scale2);
    };

    const handlePageChange = (ev, page) => {
        setScale(scales[page - 1]);
    };

    const [touchStart, setTouchStart] = React.useState(null);
    const [touchEnd, setTouchEnd] = React.useState(null);
    const [offset, setOffset] = React.useState(null);
    
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 20
    
    const onTouchStart = (e) => {
      setOffset(0);
      setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
      setTouchStart(e.targetTouches[0].clientX)
    }
    
    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX );
        setOffset(e.targetTouches[0].clientX - e.target.offsetWidth / 2); 
    }
    
    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > minSwipeDistance
      const isRightSwipe = distance < -minSwipeDistance
      if (isLeftSwipe || isRightSwipe) {
        handleTouchEnd(isLeftSwipe ? 'left' : 'right');
        setOffset(0);
      }

    }

    return (
        <>
            <MainDrawer />
            <Container maxWidth="sm" style={styles.container} data-testid="main-container">
                <Paper sx={styles.topFlex} elevation={2} >
                
                    <Box
                    style={{"transform":`translateX(${offset}px)`, "width": "100%", "paddingTop": "40px", "paddingBottom": "40px"}}         
                    onTouchStart={onTouchStart} 
                    onTouchMove={onTouchMove} 
                    onTouchEnd={onTouchEnd}>
                        <LegacyDisplay scale={scale} handleTouchEnd={handleTouchEnd} />
                    </Box>
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
        flex: 8,
        paddingTop: "5vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomFlex: {
        flex: 3,
        overflow: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}


export default LegacyScreen;