import React from 'react';

import { useMidiPlayerAutoPlay } from './useMidiPlayerAutoPlay';
import { useIframeStyling } from './useIframeStyling';
import { useMidiPlayerSrc } from './useMidiPlayerSrc';
import { useMidiPlayerNotification } from './useMidiPlayerNotification';


export default function MidiPlayer({ src, soundFont = "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus" }) {

    const iframeRef = React.useRef();

    let iframeUrl = "/midi-player.html";

    useIframeStyling(iframeRef);
    useMidiPlayerSrc(iframeRef, src);
    useMidiPlayerAutoPlay(iframeRef);
    useMidiPlayerNotification(iframeRef);

    return (
        <div style={{display:"flex", flex: 1}}>
            <iframe src={iframeUrl} style={styles.responseiveIframe} title="midi-player" scrolling="no" ref={iframeRef}></iframe>
        </div>
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