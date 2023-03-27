const ranges = require('../common/ranges');

const { Interval, Note, Scale } = require("tonal");
const MidiWriter = require('midi-writer-js');

// Get intervals
let scale = [
    "A2",
    "C#3",
    "E3",
    "A3",
    "C#4",
    "E4",
    "D4",
    "B3",
    "G#3",
    "E3",
    "D3",
    "B2",
];

const intervals = [
    "1P",
    "3M",
    "5P",
    "8P",
    "10M",
    "12P",
    "11P",
    "9M",
    "7M",
    "5P",
    "4P",
    "2M"
];

const invoke = () => {
    const { start, end } = ranges.baritone;

    const track = new MidiWriter.Track();

    const events = [];

    let currentRootNote = "A2";

    let semitoneIncrease = 1;

    let semitones = 0;
    let maxSemitones = 13;
    
    while (semitones++ < maxSemitones) {

        const scale = intervals.map((interval) => Note.transpose(currentRootNote, interval));

        events.push(new MidiWriter.NoteEvent({ pitch: scale[0], duration: '2', velocity: '100' }));

        events.push(new MidiWriter.NoteEvent({ pitch: scale, duration: '4', velocity: '100' }));

        events.push(new MidiWriter.NoteEvent({ pitch: scale[0], duration: '1', velocity: '100' }));

        currentRootNote = Note.transpose(currentRootNote, Interval.fromSemitones(semitoneIncrease));

        currentRootNote = Note.simplify(currentRootNote);

    }

    track.addEvent(events, function (event, index) {
        return { sequential: true };
    });

    const write = new MidiWriter.Writer(track);

    return {
        name: `1. Warmup`,
        description: "Warmup with Bubble / Raspberry / VVV",
        data: write.dataUri(),
    };

};

module.exports = {
    invoke,
};
