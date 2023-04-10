import React from 'react';



export function useMidiPlayerNotification(iframeRef) {

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

            const audioTag = iframeDocument.createElement('audio');
            document.body.appendChild(audioTag);
            audioTag.src = "https://raw.githubusercontent.com/anars/blank-audio/master/10-seconds-of-silence.mp3";
            audioTag.loop = true;

            controlsNode.addEventListener("click", () => {
                async function foo() {
                    await audioTag.play();

                    if ("mediaSession" in navigator) {
                        navigator.mediaSession.metadata = new MediaMetadata({
                            title: "tuneup",
                            artist: "tuneup",
                            album: "tuneup",
                        });
                    }
                }

                foo();
            }, false);

            const config = { attributes: true, childList: true, subtree: true };

            const callback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "attributes") {

                        if ("mediaSession" in navigator) {
                            if (mutation.target.classList.contains('stopped')) {
                                navigator.mediaSession.playbackState = 'paused';
                            }

                            if (mutation.target.classList.contains('playing')) {
                                navigator.mediaSession.playbackState = 'playing';
                            }
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
    }, [iframeRef]);
}
