import React from 'react';

export function useMidiPlayerAutoPlay(iframeRef) {

    const [isLoading, setIsLoading] = React.useState(true);
    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        if (!iframeRef.current)
            return;

        if (isReady) {
            const playerNode = iframeRef
                .current
                .contentWindow
                .document
                .querySelector("#player")
                .shadowRoot
                .querySelector('button.play');

            playerNode.click();
        }
    }, [iframeRef, isReady]);

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

                        if (mutation.target.classList.contains('loading')) {
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
            if (!observer)
                return;
            observer.disconnect();
        };
    }, [iframeRef, isLoading]);
}
