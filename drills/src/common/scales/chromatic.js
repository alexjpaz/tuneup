const { Interval, Scale, Note } = require("tonal");
const BaseScale = require('./BaseScale');

exports.pushScaleSection = (events = [], currentNote) => {
    let scale = Scale.get(`${currentNote} chromatic`).notes;

    let ocataveNote = Note.transpose(currentNote, Interval.fromSemitones(12));

    scale.push(ocataveNote);

    events.push({ pitch: scale[0], duration: '2', velocity: '100', sequential: true });

    events.push({ pitch: scale, duration: '8', velocity: '100', sequential: true });

    events.push({ pitch: scale.slice(1,scale.length - 1).reverse(), duration: '8', velocity: '100', sequential: true });

    events.push({ pitch: scale[0], duration: '2', velocity: '100', sequential: true });

    return {
        scale,
        topNote: ocataveNote,
        bottomNote: scale[0],
    }
};

exports.createScale = (startNote, endNote) => {
    return BaseScale.createScale(startNote, endNote, exports.pushScaleSection);
};