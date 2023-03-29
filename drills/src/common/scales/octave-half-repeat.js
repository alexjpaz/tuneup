const { Interval, Note } = require("tonal");

const { stepChord, endChord } = require("../utils");

exports.pushScaleSection = (events = [], rootNote) => {
    if(!rootNote) {
        throw new Error("root note must not be null");
    }

    let ocataveNote = Note.transpose(rootNote, Interval.fromSemitones(12));

    let scale = [
        rootNote,
        Note.transpose(rootNote, Interval.get("M3")),
        Note.transpose(rootNote, Interval.get("P5")),
        ocataveNote,
        ocataveNote,
        ocataveNote
    ];

    events.push({pitch: scale[0], duration: '2', velocity: '100', sequential: true });

    events.push({pitch: scale, duration: 'd8', velocity: '100', sequential: true });

    events.push({pitch: scale.slice(1,scale.length - 2).reverse(), duration: 'd8', velocity: '100', sequential: true });

    events.push({pitch: scale[0], duration: '2', velocity: '100', sequential: true });

    return {
        scale,
        topNote: ocataveNote,
        bottomNote: rootNote,
    };
};

exports.createScale = (startNote, endNote) => {
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
        
        let { topNote } = exports.pushScaleSection(events, currentNote);

        if (Interval.get(Interval.distance(endNote, topNote)).semitones <= 0) {
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
        
        let { bottomNote } = exports.pushScaleSection(events, currentNote);

        if (Interval.get(Interval.distance(bottomNote, startNote)).semitones < 0) {
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