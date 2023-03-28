const ranges = require('../common/ranges');

const { Interval, Note, Scale } = require("tonal");
const MidiWriter = require('midi-writer-js');

const bubble = require('../common/scales/bubble');

const invoke = () => {
    const { start, end } = ranges.baritone;

    const track = new MidiWriter.Track();

    let scale = bubble.createScale(start, end);

    let events = scale.map((event) => new MidiWriter.NoteEvent(event));

    track.addEvent(events);

    const write = new MidiWriter.Writer(track);

    return {
        name: `1. Bubble`,
        description: "Warmup with Bubble / Raspberry / VVV",
        data: write.dataUri(),
    };

};

module.exports = {
    invoke,
};
