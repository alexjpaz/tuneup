const { Interval, Note } = require("tonal");

const { endChord } = require("../utils");

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

        const { topNote } = scaleFn(events, currentNote);

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

        const { bottomNote } = scaleFn(events, currentNote);

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