import { refType } from '@mui/utils';
import { AnalyzerChart } from './AnalyzerChart';
import { AnalyzerNeedsAccess } from './AnalyzerNeedsAccess';
import { useMicrophoneStreamAnalyser } from './useMicrophoneStreamAnalyser';

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