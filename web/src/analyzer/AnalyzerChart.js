import React from 'react';


export function AnalyzerChart({ analyser }) {

    const canvasRef = React.useRef();

    React.useEffect(() => {
        if(!analyser) return;
        if(!canvasRef || !canvasRef.current) return;

        // TODO - memory leak if we dont garbage collect?
        let dataArray = new Float32Array(analyser.frequencyBinCount);
        const canvas = canvasRef.current;
        var ctx = canvas.getContext("2d");

        function step() {
            if(dataArray === null) return;

            analyser.getFloatFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for(var i=0; i<dataArray.length; i+=5) {
                const barWidth = dataArray[i];

                ctx.beginPath();
                ctx.rect(0, i, 50, 10);
                ctx.fillStyle = `rgb(${barWidth + 200}, 50, 50)`;
                ctx.fill();
                ctx.closePath();
            }

            requestAnimationFrame(step);
        }

        step();
        
        return () => {
            dataArray = null;
        };
    }, [ analyser, canvasRef ]);


    return (
        <div>
            <canvas ref={canvasRef} width="200px" height="200px"></canvas>
        </div>
    );
}
