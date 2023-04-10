import React from 'react';



export function useMidiPlayerNotification(iframeRef) {

    React.useEffect(() => {
        if (!iframeRef.current)
            return;

        let observer;

        iframeRef.current.addEventListener("load", () => {
            if ('mediaSession' in navigator) {

                navigator.mediaSession.metadata = new MediaMetadata({
                title: 'Never Gonna Give You Up',
                artist: 'Rick Astley',
                album: 'Whenever You Need Somebody',
                artwork: [
                    { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
                    { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
                    { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
                    { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
                    { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
                    { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
                ]
                });
            
                navigator.mediaSession.setActionHandler('play', function() {});
                navigator.mediaSession.setActionHandler('pause', function() {});
                navigator.mediaSession.setActionHandler('seekbackward', function() {});
                navigator.mediaSession.setActionHandler('seekforward', function() {});
                navigator.mediaSession.setActionHandler('previoustrack', function() {});
                navigator.mediaSession.setActionHandler('nexttrack', function() {});
            }

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
                        console.log(123, mutation.target)

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
    }, [ iframeRef ]);
}
