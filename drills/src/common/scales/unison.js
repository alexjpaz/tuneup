const { Interval, Note } = require("tonal");

exports.stepChord = (currentNote) => {
    return {
        pitch: [
            currentNote,
            Note.transpose(currentNote, "m3"),
            Note.transpose(currentNote, "P5")
        ],
        duration: ['2'],
        velocity: '100',
        sequential: false,
    };
};

exports.endChord = (currentNote) => {
    return {
        pitch: [
            currentNote,
            Note.transpose(currentNote, "M3"),
            Note.transpose(currentNote, "P5")
        ],
        duration: ['1','1'],
        velocity: '100',
        sequential: false,
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

    // events.push(exports.endChord(currentNote));

    while (currentNote !== null) {

        events.push(exports.stepChord(currentNote));

        events.push({ pitch: currentNote, duration: '2', velocity: '100', });
        events.push({ pitch: currentNote, duration: '2', velocity: '100', });
        events.push({ pitch: currentNote, duration: '2', velocity: '100', });

        if (Interval.get(Interval.distance(endNote, currentNote)).semitones < 0) {
            currentNote = Note.transpose(currentNote, Interval.fromSemitones(1));
            currentNote = Note.simplify(currentNote);
        } else {
            currentNote = null;
        }
    }

    events.push(exports.endChord(endNote));

    return events;
};