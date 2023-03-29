const { Interval, Note } = require("tonal");
const { stepChord, endChord } = require("../utils");

const intervals = [
    "1P",
    "3M",
    "5P",
    "8P",
    "10M",
    "12P", // highest note = index 5
    "11P",
    "9M",
    "7M",
    "5P",
    "4P",
    "2M"
];

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
        
        const scale = intervals.map((interval) => Note.transpose(currentNote, interval));

        events.push(stepChord(currentNote));
        
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

        const scale = intervals.map((interval) => Note.transpose(currentNote, interval));

        events.push(stepChord(currentNote));
        
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

    return events;
};