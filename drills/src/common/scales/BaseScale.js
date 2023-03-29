const { Interval, Note } = require("tonal");

const { stepChord, endChord } = require("../utils");


exports.createScale = (startNote, endNote, scaleFn) => {
    if (!startNote) {
        throw new Error("start note must not be null");
    }

    if (!endNote) {
        throw new Error("start note must not be null");
    }

    const events = [];

    let currentNote = startNote;

    let lastNote = null;
    
    while (currentNote !== null) {
        
        events.push(stepChord(currentNote));

        const scale = scaleFn();

        const endNote = "A4" // TODO determine end note from scale
        
        events.push({ pitch: scale, duration: '4', velocity: '100', sequential: true });
        
        events.push({ pitch: scale[0], duration: '1', velocity: '100' });

        if (Interval.get(Interval.distance(endNote, scale[5])).semitones <= 0) {
            currentNote = Note.transpose(currentNote, Interval.fromSemitones(1));
            currentNote = Note.simplify(currentNote);
        } else {
            lastNote = currentNote;
            currentNote = null;
            break;
        }
    }

    currentNote = lastNote;

    while (currentNote !== null) {

        events.push(stepChord(currentNote));

        const scale = scaleFn();
        
        events.push({ pitch: scale, duration: '4', velocity: '100', sequential: true });
        
        events.push({ pitch: scale[0], duration: '1', velocity: '100' });

        if (Interval.get(Interval.distance(scale[0], startNote)).semitones < 0) {
            currentNote = Note.transpose(currentNote, Interval.fromSemitones(-1));
            currentNote = Note.simplify(currentNote);
        } else {

            lastNote = currentNote;
            currentNote = null;
            break;
        }
    }

    events.push(endChord(lastNote));

    return events;
};