const { Interval, Note } = require("tonal");

const { stepChord, endChord } = require("../utils");

const BaseScale = require('./BaseScale');

exports.pushScaleSection = (events = [], rootNote) => {
    if(!rootNote) {
        throw new Error("root note must not be null");
    }

    let ocataveNote = Note.transpose(rootNote, Interval.fromSemitones(12));

    let scale = [
        rootNote,
        Note.transpose(rootNote, Interval.get("M3")),
        Note.transpose(rootNote, Interval.get("P5")),
        Note.transpose(rootNote, Interval.fromSemitones(12)),
    ];

    events.push({pitch: scale[0], duration: '2', velocity: '100', sequential: true });

    for(let i=0; i<3; i++) {

        events.push({pitch: scale, duration: 'd8', velocity: '100', sequential: true });

        events.push({pitch: scale.slice(1,scale.length - 1).reverse(), duration: 'd8', velocity: '100', sequential: true });

    }

    events.push({pitch: scale[0], duration: '2', velocity: '100', sequential: true });

    return {
        scale,
        topNote: ocataveNote,
        bottomNote: rootNote,
    };
};

exports.createScale = (startNote, endNote) => {
    return BaseScale.createScale(startNote, endNote, exports.pushScaleSection);
};