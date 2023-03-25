import React from 'react';
import { useTheme } from '@mui/material/styles';



export function useIframeStyling(iframeRef = {}) {

    const theme = useTheme();

    React.useEffect(() => {
        if (!iframeRef.current)
            return;


        let listener = iframeRef.current.addEventListener("load", () => {

            const iframeDocument = iframeRef
                .current
                .contentWindow
                .document;

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
                </style>`);


            visualizer.config = {
                noteHeight: 10,
                minPitch: 30,
                showOnlyOctavesUsed: true,
            };
        });

        const currentRef = iframeRef.current;

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("load", listener);
            }
        };

    }, [iframeRef, theme]);

    return null;
}
