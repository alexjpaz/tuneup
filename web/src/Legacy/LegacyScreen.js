import React from "react";

import MainDrawer from "../Drawer";

import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Paper, Box, Button } from '@mui/material';

import { IconButton } from '@mui/material';
import {
    PlayCircle as PlayArrowIcon,
    PauseCircle as PauseIcon,
    SkipNext as SkipNextIcon,
    SkipPrevious as SkipPreviousIcon,
} from "@mui/icons-material";

import database from '../database-legacy.json';


function LegacyDisplay({ scale, handleTouchEnd = () => { } }) {



    return (
        <Typography
            fontSize="1.75rem"
            textAlign={"center"}
            variant="body1"
            style={{ "alignSelf": "center", "width": "100%" }}
        >
            {scale.label}
        </Typography>
    );
}

function LegacyControls({ scale, nextCallback = () => { }, previousCallback = () => { } }) {

    const audioRef = React.useRef();

    const [isPlaying, setIsPlaying] = React.useState(false);

    React.useEffect(() => {
        if (!audioRef || !audioRef.current) return;

        const ref = audioRef.current

        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: scale.label,
                artist: "tuneup | scale excercises",
            });


            navigator.mediaSession.setActionHandler('nexttrack', () => {
                nextCallback();
            });
            // TODO: Update playback state.
        }

        const pauseListener = ref.addEventListener('pause', () => {
            setIsPlaying(false);
        });

        const playListener = ref.addEventListener('playing', () => {
            setIsPlaying(true);
        });

        const endedListner = ref.addEventListener("ended", (event) => {
            nextCallback();
        });

        return () => {
            if (!ref) return;
            ref.removeEventListener('pause', pauseListener);
            ref.removeEventListener('playing', playListener);
            ref.removeEventListener('playing', endedListner);
        };

    }, [audioRef, nextCallback, scale]);

    const onClickPrevious = (e) => {
        e.stopPropagation();
        if (!audioRef || !audioRef.current) return;

        previousCallback();
    };

    const onClickPlay = (e) => {
        e.stopPropagation();
        if (!audioRef || !audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    const onClickNext = (e) => {
        e.stopPropagation();
        if (!audioRef || !audioRef.current) return;
        nextCallback();
    };


    return (
        <Box style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "alignSelf": "center" }}>
            <audio src={`/media/${scale.value}`} ref={audioRef} controls autoPlay></audio>
            <Box>
                <IconButton aria-label="previous" size="large" onClick={onClickPrevious}>
                    <SkipPreviousIcon size="large" />
                </IconButton>
                <IconButton aria-label="play" size="large" onClick={onClickPlay}>
                    {!isPlaying && <PlayArrowIcon color="secondary" sx={{ fontSize: 72 }} />}
                    {isPlaying && <PauseIcon color="secondary" sx={{ fontSize: 72 }} />}
                </IconButton>
                <IconButton aria-label="next" size="large" onClick={onClickNext}>
                    <SkipNextIcon size="large" />
                </IconButton>
            </Box>
        </Box>
    )
}

function LegacyScreen() {
    return (
        <>
            <MainDrawer />
            <LegacyGuideContainerGate />
        </>
    );
}

function LegacyGuideStartComponent({ onClickStart = () => { } }) {

    return (
        <Container maxWidth="sm" style={styles.container} data-testid="main-container">
            <Paper sx={styles.bottomFlex} elevation={2}>
                <Box style={{"alignSelf": "center"}}>
                    <Button variant="contained" size={"large"} color="secondary" startIcon={<PlayArrowIcon />} onClick={onClickStart} >
                        Start Guided Scales
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

function LegacyGuideContainerGate() {
    const [started, setStarted] = React.useState(true);

    return (
        <>
            {started && <LegacyGuideContainer />}
            {!started && <LegacyGuideStartComponent onClickStart={() => setStarted(true)} />}
        </>
    );
}

function LegacyGuideContainer() {
    const scales = database.guided.scales;

    const [scale, setScale] = React.useState(scales[0]);

    const handleTouchEnd = (direction) => {
        let index = scales.indexOf(scale);

        if (direction === "right") {
            index--;
        }

        if (direction === "left") {
            index++;
        }

        let scale2 = scales[index];

        if (!scale2) {
            scale2 = scales[0];
        }

        setScale(scale2);
    };

    const [touchStart, setTouchStart] = React.useState(null);
    const [touchEnd, setTouchEnd] = React.useState(null);
    const [offset, setOffset] = React.useState(null);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 40

    const onTouchStart = (e) => {
        setOffset(0);
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
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
            <Container maxWidth="sm" style={styles.container} data-testid="main-container">
                <Paper sx={styles.topFlex} elevation={2} >
                    <Paper
                        elevation={20} 

                        style={{ "transform": `translateX(${offset}px)`, "display": "flex", "alignItems": "stretch", "width":"90%", "alignSelf": "center", "aspectRatio": "1 / 1", "padding": "10px", "textAlign": "center", "background": scale.background }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}>
                        <LegacyDisplay scale={scale} handleTouchEnd={handleTouchEnd} style={{ "display": "flex", "alignSelf": "stretch", }} />
                    </Paper>
                </Paper>
                <Paper sx={styles.bottomFlex} elevation={12}>
                    <LegacyControls scale={scale} nextCallback={() => handleTouchEnd("left")} previousCallback={() => handleTouchEnd("right")} />
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
        alignItems: "stretch",
        justifyContent: "center",
    },
    bottomFlex: {
        flex: 2,
        overflow: "auto",
        display: "flex",
        paddingTop: "20px",
        alignItems: "baseline",
        justifyContent: "center",
    }
}


export default LegacyScreen;