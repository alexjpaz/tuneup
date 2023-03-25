const { Interval, Note } = require("tonal");

exports.createScale = (rootNote) => {
    if(!rootNote) {
        throw new Error("root note must not be null");
    }

    let scale = [
        rootNote,
        Note.transpose(rootNote, Interval.get("M3")),
        Note.transpose(rootNote, Interval.get("P5")),
        Note.transpose(rootNote, Interval.fromSemitones(12)),
    ];

    return scale;
};