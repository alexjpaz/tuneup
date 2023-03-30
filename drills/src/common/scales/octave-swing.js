const { Interval, Note } = require("tonal");

const { stepChord, endChord } = require("../utils");

exports.pushScaleSection = (events = [], currentNote) => {
    events.push(stepChord(currentNote));

    const octaveNote = Note.transpose(currentNote, Interval.fromSemitones(12));

    events.push({ pitch: currentNote, duration: '2', velocity: '100',  });
    events.push({ pitch: octaveNote, duration: '2', velocity: '100',  });
    events.push({ pitch: currentNote, duration: 'd2', velocity: '100',  });

    return {
        events,
        bottomNote: currentNote,
        topNote: octaveNote,
    }
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

        const { topNote } = exports.pushScaleSection(events, currentNote);

        if (Interval.get(Interval.distance(endNote, topNote)).semitones < 0) {
            currentNote = Note.transpose(currentNote, Interval.fromSemitones(1));
            currentNote = Note.simplify(currentNote);
        } else {
            lastNote = currentNote;
            currentNote = null;
        }
    }

    currentNote = lastNote;

    while (currentNote !== null) {

        const { bottomNote } = exports.pushScaleSection(events, currentNote);

        if (Interval.get(Interval.distance(currentNote, startNote)).semitones < 0) {
            currentNote = Note.transpose(currentNote, Interval.fromSemitones(-1));
            currentNote = Note.simplify(currentNote);
        } else {
            lastNote = currentNote;
            currentNote = null;
        }
    }

    events.push(endChord(lastNote));
    
    return events;
};