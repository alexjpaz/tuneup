const { Interval, Note } = require("tonal");

const { stepChord, endChord } = require("../utils");

exports.createScale = (startNote, endNote) => {
    if (!startNote) {
        throw new Error("start note must not be null");
    }

    if (!endNote) {
        throw new Error("start note must not be null");
    }

    const events = [];

    let currentNote = startNote;

    while (currentNote !== null) {

        events.push(stepChord(currentNote));

        const octaveNote = Note.transpose(currentNote, Interval.fromSemitones(12));

        events.push({ pitch: currentNote, duration: '2', velocity: '100',  });
        events.push({ pitch: octaveNote, duration: '2', velocity: '100',  });
        events.push({ pitch: currentNote, duration: 'd2', velocity: '100',  });

        if (Interval.get(Interval.distance(endNote, currentNote)).semitones < 0) {
            currentNote = Note.transpose(currentNote, Interval.fromSemitones(1));
            currentNote = Note.simplify(currentNote);
        } else {
            currentNote = null;
        }
    }

    events.push(endChord(endNote));
    
    return events;
};