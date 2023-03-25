import React from 'react';
import { IconButton } from '@mui/material';
import { Pause, PlayArrow } from "@mui/icons-material";


export function MidiPlayerMUIControls({ iframeRef }) {

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onPlayButtonClick = () => {
        if (!iframeRef.current)
            return;

        const playerNode = iframeRef
            .current
            .contentWindow
            .document
            .querySelector("#player")
            .shadowRoot
            .querySelector('button.play');

        playerNode.click();
    };

    React.useEffect(() => {
        if (!iframeRef.current)
            return;

        let observer;

        iframeRef.current.addEventListener("load", () => {

            const iframeDocument = iframeRef
                .current
                .contentWindow
                .document;

            const controlsNode = iframeDocument
                .querySelector("#player")
                .shadowRoot
                .querySelector(".controls");

            const config = { attributes: true, childList: true, subtree: true };

            const callback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "attributes") {
                        if (isLoading) {
                            if (mutation.target.classList.contains('stopped') && !mutation.target.classList.contains('loading')) {
                                setIsLoading(false);

                                const playerNode = iframeRef
                                    .current
                                    .contentWindow
                                    .document
                                    .querySelector("#player")
                                    .shadowRoot
                                    .querySelector('button.play');

                                playerNode.click();
                            }
                        }

                        if (mutation.target.classList.contains('playing')) {
                            setIsPlaying(true);
                        }

                        if (mutation.target.classList.contains('stopped')) {
                            setIsPlaying(false);
                        }
                    }
                }
            };

            observer = new MutationObserver(callback);

            observer.observe(controlsNode, config);
        });

        return () => {
            if (!observer)
                return;
            observer.disconnect();
        };
    }, [iframeRef, isLoading]);

    return (
        <IconButton aria-label="delete" onClick={onPlayButtonClick} variant="contained">
            {!isPlaying && <PlayArrow />}
            {isPlaying && <Pause />}
        </IconButton>
    );
}
