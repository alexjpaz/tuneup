const { Interval, Note, Scale } = require("tonal");


const ranges = {
  baritone: {
    start: "G2",
    end: "G4",
  }
};

const { start, end } = ranges.baritone;

const distance = Interval.distance(start, end);

let note = "G2"

let interval = "1P";

const semitoneIncrease = 1;

interval = Interval.add(interval, Interval.fromSemitones(semitoneIncrease));

note = Note.transpose(note, interval);

console.log(Scale.get(`${note} major`).notes);

