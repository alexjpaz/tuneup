const { Interval, Note } = require("tonal");
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
    const scale = intervals.map((interval) => Note.transpose(currentNote, interval));

    events.push(stepChord(currentNote));
    
    events.push({ pitch: scale, duration: '4', velocity: '100', sequential: true });
    
    events.push({ pitch: scale[0], duration: '1', velocity: '100' });

    return {
        scale,
        events,
        bottomNote: scale[0],
        topNote: scale[5],
    }
};

exports.createScale = (startNote, endNote) => {
    return BaseScale.createScale(startNote, endNote, exports.pushScaleSection);
};