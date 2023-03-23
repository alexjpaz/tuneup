import React from 'react';


export function useMicrophoneStreamAnalyser() {

    const [stream, setStream] = React.useState(null);
    const [needsAccess, setNeedAccess] = React.useState(null);
    const [analyser, setAnalyser] = React.useState(null);


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

            } catch (e) {
                setNeedAccess(true);
            }

            setStream(stream);
        }

        if (stream === null) {
            getStream();
        }

    }, [stream, needsAccess]);

    return [analyser, needsAccess];
}
