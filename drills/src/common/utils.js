const { Note } = require("tonal");

exports.stepChord = (currentNote) => {
    return {
        pitch: [
            currentNote,
            Note.transpose(currentNote, "m3"),
            Note.transpose(currentNote, "P5")
        ],
        duration: ['2'],
        velocity: '100',
        sequential: false,
        wait: "16",
    };
};

exports.endChord = (currentNote) => {
    return {
        pitch: [
            currentNote,
            Note.transpose(currentNote, "M3"),
            Note.transpose(currentNote, "P5")
        ],
        duration: ['1','1'],
        velocity: '100',
        sequential: false,
    };
};