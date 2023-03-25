const { Interval, Note } = require("tonal");

exports.createScale = (rootNote, repeat = 3) => {
    if(!rootNote) {
        throw new Error("root note must not be null");
    }

    let ocataveNote = Note.transpose(rootNote, Interval.fromSemitones(12));

    let scale = [
        rootNote,
        Note.transpose(rootNote, Interval.get("M3")),
        Note.transpose(rootNote, Interval.get("P5")),
        ocataveNote
    ];

    for(let i=0; i < repeat - 1; i++) {
        scale.push(ocataveNote);
    }

    return scale;
};