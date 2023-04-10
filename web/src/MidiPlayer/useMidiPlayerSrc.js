import React from 'react';



export function useMidiPlayerSrc(iframeRef, src) {
    React.useEffect(() => {
        if (!iframeRef.current)
            return;

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

            if (!player)
                return;
            if (!visualizer)
                return;

            player.src = src;
            visualizer.src = src;

            setTimeout(() => {
                let targetNote = visualizer.querySelector('.note.active');
                const visualizerDiv = visualizer.querySelector('.piano-roll-visualizer');

                if (!targetNote) {
                    targetNote = visualizer.querySelector('.note:nth-of-type(1)');
                }

                if (!targetNote)
                    return;

                if(visualizerDiv) {
                    visualizerDiv.scrollTop = targetNote.y.baseVal.valueAsString - 20;
                    visualizerDiv.scrollLeft = targetNote.x.baseVal.valueAsString - 20;
                }
            }, 100);

        };

        setSrc();

        const listener = iframeRef.current.addEventListener("load", setSrc);

        const currentRef = iframeRef.current;

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("load", listener);
            }
        };
    }, [iframeRef, src]);

}
