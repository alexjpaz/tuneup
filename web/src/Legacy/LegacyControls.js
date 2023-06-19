import React from "react";
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import {
    PlayCircle as PlayArrowIcon,
    PauseCircle as PauseIcon,
    SkipNext as SkipNextIcon,
    SkipPrevious as SkipPreviousIcon
} from "@mui/icons-material";

export function LegacyControls({ scale, nextCallback = () => { }, previousCallback = () => { } }) {

    const audioRef = React.useRef();

    const [isPlaying, setIsPlaying] = React.useState(false);

    React.useEffect(() => {
        if (!audioRef || !audioRef.current) return;

        const ref = audioRef.current;

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
    );
}
