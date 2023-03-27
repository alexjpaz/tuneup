const { Interval, Note } = require("tonal");

exports.createScale = (startNote, endNote) => {
    if (!startNote) {
        throw new Error("start note must not be null");
    }

    if (!endNote) {
        throw new Error("start note must not be null");
    }

    const events = [];

    let currentNote = startNote;

    let isAtTheEndOfTheScale = false;

    events.push({
        pitch: currentNote,
        duration: '1',
        velocity: '100',
    });

    while (currentNote !== null) {

        const event = {
            pitch: currentNote,
            duration: '2',
            velocity: '100',
        };

        events.push(event);


        if (Interval.get(Interval.distance(endNote, currentNote)).semitones < 0) {
            currentNote = Note.transpose(currentNote, Interval.fromSemitones(1));
            currentNote = Note.simplify(currentNote);
        } else {
            currentNote = null;
        }
    }

    events.push({
        pitch: endNote,
        duration: '1',
        velocity: '100',
    });

    return events;
};