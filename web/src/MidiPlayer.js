import React from 'react';

export default function MidiPlayer({ src, soundFont = "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus" }) {

    let iframeUrl = "/midi-player.html";

    const params = new URLSearchParams();
    params.set("midiSrc", src);
    params.set("soundfontSrc", soundFont);

    iframeUrl = iframeUrl + "?" + params.toString();

    return (
        <div style={styles.container}>
            <iframe src={iframeUrl} style={styles.responseiveIframe} title="midi-player" scrolling="no"></iframe>
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