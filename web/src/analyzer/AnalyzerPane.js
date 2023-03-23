import { refType } from '@mui/utils';
import React from 'react';

export function useMicrophoneStreamAnalyser() {

    const [ stream, setStream ] = React.useState(null);
    const [ needsAccess, setNeedAccess ] = React.useState(null);
    const [ analyser, setAnalyser ] = React.useState(null);


    React.useEffect(() => {

        async function getStream() {
            const constraints = {
                audio: true,
            };

            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);

                const audioCtx = new AudioContext();

                const source = audioCtx.createMediaStreamSource(stream);

                const analyser = audioCtx.createAnalyser();

                source.connect(analyser);

                setAnalyser(analyser);

                setNeedAccess(false);
                
            } catch(e) {
                setNeedAccess(true);
            }
            
            setStream(stream);
        }
        
        if(stream === null) {
            getStream();
        }
        
    }, [ stream, needsAccess ]);

    return [ analyser, needsAccess ];
}

export function AnalyzerNeedsAccess() {
    return (
        <h1>analyzer needs access</h1>
    );
}

export function AnalyzerChart({ analyser }) {

    React.useEffect(() => {
        if(!analyser) return;

        // TODO - memory leak if we dont garbage collect?
        let dataArray = new Float32Array(analyser.frequencyBinCount);

        const tid = setInterval(() => {
            analyser.getFloatFrequencyData(dataArray);

            console.log(dataArray);
        }, 500);

        return () => {
            clearInterval(tid);
            dataArray = null;
        };
    }, [ analyser ]);


    return (
        <pre>lol</pre>
    );
}

export default function AnalyzerPane() {
    
    const [ analyser, needsAccess ] = useMicrophoneStreamAnalyser();

    if(needsAccess) {
        return (
            <AnalyzerNeedsAccess />
        )
    }


    if(analyser) {
        return (
            <AnalyzerChart analyser={analyser} />
        )
    }

    return (
        <h1>something aint right</h1>
    );
}