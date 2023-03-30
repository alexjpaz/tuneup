const { Interval, Note } = require("tonal");

const { stepChord } = require("../utils");

const BaseScale = require('./BaseScale');

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
    return BaseScale.createScale(startNote, endNote, exports.pushScaleSection);
};