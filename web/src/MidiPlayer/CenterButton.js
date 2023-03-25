import React from 'react';
import { IconButton } from '@mui/material';
import { CenterFocusWeak } from "@mui/icons-material";


export function CenterButton({ iframeRef }) {

    const onClick = (e) => {
        if (!iframeRef.current)
            return;

        e.stopPropagation();

        const visualizer = iframeRef
            .current
            .contentWindow
            .document
            .querySelector("#main-midi-visualizer");

        if (!visualizer)
            return;

        let targetNote = visualizer.querySelector('.note.active');
        const visualizerDiv = visualizer.querySelector('.piano-roll-visualizer');

        const waterfallVisualizerDiv = visualizer.querySelector('.waterfall-notes-container');

        if (waterfallVisualizerDiv) {
            waterfallVisualizerDiv.scrollTop = 100000;
        }

        if (!targetNote) {
            targetNote = visualizer.querySelector('.note:nth-of-type(1)');
        }

        if (!targetNote)
            return;

        visualizerDiv.scrollTop = targetNote.y.baseVal.valueAsString - 20;
        visualizerDiv.scrollLeft = targetNote.x.baseVal.valueAsString - 20;

    };

    return (
        <IconButton onClick={onClick}>
            <CenterFocusWeak />
        </IconButton>
    );
}
