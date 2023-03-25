import React from 'react';

import { PitchDetector } from 'pitchy';

export function AnalyzerChart({ analyser }) {

    const canvasRef = React.useRef();

    React.useEffect(() => {
        if(!analyser) return;
        if(!canvasRef || !canvasRef.current) return;

        const detector = PitchDetector.forFloat32Array(analyser.fftSize);
        const input = new Float32Array(detector.inputLength);
        console.log(analyser);
        const sampleRate = analyser.context.sampleRate;  // TODO get from audioContext

        const canvas = canvasRef.current;
        var ctx = canvas.getContext("2d");

        
        (function step() {
            const [pitch, clarity] = detector.findPitch(input, sampleRate); analyser.getFloatTimeDomainData(input);
            
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "48px serif";
            ctx.fillText(`${pitch},${clarity},${Math.random()}`, 10, 50);

            requestAnimationFrame(step);
        })();

        
        return () => {

        };
    }, [ analyser, canvasRef ]);


    return (
        <div>
            <canvas ref={canvasRef} width="200px" height="200px"></canvas>
        </div>
    );
}
