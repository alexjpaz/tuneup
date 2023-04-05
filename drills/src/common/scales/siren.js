const { Interval, Note, Scale } = require("tonal");
const { stepChord, endChord } = require("../utils");
const BaseScale = require('./BaseScale');

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

exports.pushScaleSection = (events = [], currentNote) => {
    let scale = Scale.get(`${currentNote} major`).notes;

    let ocataveNote = Note.transpose(currentNote, Interval.fromSemitones(12));
    
    const topNote = ocataveNote;
    const bottomNote = scale[0];

    events.push({ pitch: bottomNote, duration: '4', velocity: '100' });
    events.push({ pitch: bottomNote, duration: '4', velocity: '100' });
    events.push({ pitch: bottomNote, duration: '4', velocity: '100' });
    events.push({ pitch: bottomNote, duration: '4', velocity: '100' });
    
    events.push({ pitch: scale, duration: '8', velocity: '100', sequential: true });

    events.push({ pitch: topNote, duration: '4', velocity: '100', sequential: true });
    events.push({ pitch: topNote, duration: '4', velocity: '100', sequential: true });
    events.push({ pitch: topNote, duration: '4', velocity: '100', sequential: true });
    events.push({ pitch: topNote, duration: '4', velocity: '100', sequential: true });

    events.push({ pitch: topNote, duration: '8', velocity: '100', sequential: true });

    events.push({pitch: scale.slice(1).reverse(), duration: '8', velocity: '100', sequential: true });
    
    events.push({ pitch: scale[0], duration: '1', velocity: '100' });

    return {
        scale,
        events,
        bottomNote,
        topNote,
    }
};

exports.createScale = (startNote, endNote) => {
    return BaseScale.createScale(startNote, endNote, exports.pushScaleSection);
};