import React from 'react';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Pause, PlayArrow } from "@mui/icons-material";


function useMidiPlayerAutoPlay(iframeRef) {

    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ isReady, setIsReady ] = React.useState(false);

    React.useEffect(() => {
        if(!iframeRef.current) return;

        if(isReady) {
            const playerNode = iframeRef
                .current
                .contentWindow
                .document
                .querySelector("#player")
                .shadowRoot
                .querySelector('button.play')
            ;

            playerNode.click();
        }
    }, [ iframeRef, isReady ]);

    React.useEffect(() => {
        if(!iframeRef.current) return;

        let observer;

        iframeRef.current.addEventListener("load", () => {

            const iframeDocument = iframeRef
                .current
                .contentWindow
                .document

            ;

            const controlsNode = iframeDocument
                .querySelector("#player")
                .shadowRoot
                .querySelector(".controls")
            ;

            const config = { attributes: true, childList: true, subtree: true };

            const callback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "attributes") {
                        
                        if(mutation.target.classList.contains('loading')) {
                            setIsLoading(true);
                            setIsReady(false);
                        } else {
                            setIsLoading(false);
                            setIsReady(true);
                        }
                    }
                }
            };

            observer = new MutationObserver(callback);

            observer.observe(controlsNode, config);
        });

        return () => {
            if(!observer) return;
            observer.disconnect();
        };
    }, [ iframeRef, isLoading ]);
}

export function useIframeStyling(iframeRef = {}) {

    const theme = useTheme();

    React.useEffect(() => {
        if(!iframeRef.current) return;

        
        let listener = iframeRef.current.addEventListener("load", () => {

            const iframeDocument = iframeRef
                .current
                .contentWindow
                .document

            ;

            const visualizer = iframeRef
                .current
                .contentWindow
                .document
                .querySelector("#main-midi-visualizer");

            iframeDocument
                .head
                .insertAdjacentHTML("beforeend", 
                `<style>
                    .visualizer-container {
                        background: ${theme.palette.primary[300]};
                        
                    }

                    .visualizer-container midi-visualizer svg rect.note {

                        stroke-width: 2;
                    }

                    .visualizer-container midi-visualizer svg rect.note.active {
                        fill: ${theme.palette.secondary[400]};
                        stroke-width: 2;
                    }

                    midi-player::part(play-button) {
                        background-color: ${theme.palette.secondary[400]};
                    }
                </style>`)
            ;            
            

            visualizer.config = {
                noteHeight: 10,
                minPitch: 30,
                showOnlyOctavesUsed: true,
            };
        });

        const currentRef = iframeRef.current;

        return () => {
            if(currentRef) {
                currentRef.removeEventListener("load", listener);
            }
        };

    }, [ iframeRef, theme ]);

    return null;
}

export function useMidiPlayerSrc(iframeRef, src) {
    React.useEffect(() => {
        if(!iframeRef.current) return;

        const setSrc = () => {
            const player = iframeRef
                .current
                .contentWindow
                .document
                .querySelector("#player");

            const visualizer = iframeRef
                .current
                .contentWindow
                .document
                .querySelector("#main-midi-visualizer");

            if(!player) return;
            if(!visualizer) return;
            
            player.src = src;
            visualizer.src = src;

            setTimeout(() => { 
                let targetNote = visualizer.querySelector('.note.active')
                const visualizerDiv = visualizer.querySelector('.piano-roll-visualizer');
    
                if (!targetNote) {
                    targetNote = visualizer.querySelector('.note:nth-of-type(1)');
                }
    
                if (!targetNote) return;
    
                visualizerDiv.scrollTop = targetNote.y.baseVal.valueAsString - 20;
                visualizerDiv.scrollLeft = targetNote.x.baseVal.valueAsString - 20;
;
            }, 100)

        }

        setSrc();

        const listener = iframeRef.current.addEventListener("load", setSrc);

        const currentRef = iframeRef.current;

        return () => {
            if(currentRef) {
                currentRef.removeEventListener("load", listener);
            }
        };
    }, [ iframeRef, src ]);

}

export default function MidiPlayer({ src, soundFont = "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus" }) {

    const iframeRef = React.useRef();

    let iframeUrl = "/midi-player.html";

    useIframeStyling(iframeRef);
    useMidiPlayerSrc(iframeRef, src);
    useMidiPlayerAutoPlay(iframeRef);

    return (
        <iframe src={iframeUrl} style={styles.responseiveIframe} title="midi-player" scrolling="no" ref={iframeRef}></iframe>
    );
}

export function MidiPlayerMUIControls({ iframeRef }) {

    const [ isPlaying, setIsPlaying ] = React.useState(false);
    const [ isLoading, setIsLoading ] = React.useState(false);

    const onPlayButtonClick = () => {
        if(!iframeRef.current) return;

        const playerNode = iframeRef
            .current
            .contentWindow
            .document
            .querySelector("#player")
            .shadowRoot
            .querySelector('button.play')
        ;

        playerNode.click();
    };

    React.useEffect(() => {
        if(!iframeRef.current) return;

        let observer;

        iframeRef.current.addEventListener("load", () => {

            const iframeDocument = iframeRef
                .current
                .contentWindow
                .document

            ;

            const controlsNode = iframeDocument
                .querySelector("#player")
                .shadowRoot
                .querySelector(".controls")
            ;

            const config = { attributes: true, childList: true, subtree: true };

            const callback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "attributes") {
                        if(isLoading) {
                            if(mutation.target.classList.contains('stopped') && !mutation.target.classList.contains('loading')) {
                                setIsLoading(false);

                                const playerNode = iframeRef
                                    .current
                                    .contentWindow
                                    .document
                                    .querySelector("#player")
                                    .shadowRoot
                                    .querySelector('button.play')
                                ;

                                playerNode.click();
                            }
                        }

                        if(mutation.target.classList.contains('playing')) {
                            setIsPlaying(true);
                        }

                        if(mutation.target.classList.contains('stopped')) {
                            setIsPlaying(false);
                        }
                    }
                }
            };

            observer = new MutationObserver(callback);

            observer.observe(controlsNode, config);
        });

        return () => {
            if(!observer) return;
            observer.disconnect();
        };
    }, [ iframeRef, isLoading ]);

    return (
        <IconButton aria-label="delete" onClick={onPlayButtonClick} variant="contained">
            {!isPlaying && <PlayArrow />}
            {isPlaying && <Pause />}
        </IconButton>
    );
}


const styles = {
    none: {},
    container: {
        position: "relative",

    },
    iframeContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        paddingTop: "75%" /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    },

    responseiveIframe: {

        flexDirection: "row",
        flex: 1,
        border: 0,
    }

}