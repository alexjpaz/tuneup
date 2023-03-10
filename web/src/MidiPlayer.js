import React from 'react';
import { IconButton } from '@mui/material';

import { Pause, PlayArrow, PlayArrowRounded } from "@mui/icons-material";

export default function MidiPlayer({ src, soundFont = "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus" }) {

    const iframeRef = React.useRef();
    const [ isPlaying, setIsPlaying ] = React.useState(false);

    let iframeUrl = "/midi-player.html";

    const params = new URLSearchParams();
    params.set("midiSrc", src);
    params.set("soundfontSrc", soundFont);

    iframeUrl = iframeUrl + "?" + params.toString();

    const onPlayButtonClick = () => {
        if(!iframeRef.current) return;

        console.log(iframeRef.current)

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

        iframeRef.current.onload = () => {

            const controlsNode = iframeRef
                .current
                .contentWindow
                .document
                .querySelector("#player")
                .shadowRoot
                .querySelector(".controls")
            ;

            const config = { attributes: true, childList: true, subtree: true };

            const callback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "attributes") {
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
        }
        return () => {
            if(!observer) return;
            observer.disconnect();
        };
    }, [ iframeRef ]);

    return (
        <div>
            <div style={styles.container}>
                <iframe src={iframeUrl} style={styles.responseiveIframe} title="midi-player" scrolling="no" ref={iframeRef}></iframe>
            </div>
            <IconButton aria-label="delete" onClick={onPlayButtonClick} variant="contained">
                { !isPlaying && <PlayArrow /> }
                { isPlaying && <Pause />}
            </IconButton>
        </div>
    );
}

const styles = {
    container: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        paddingTop: "75%" /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    },
    responseiveIframe: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        border: 0,
        height: "100%",
        maxHeight: "50vh"
    }

}