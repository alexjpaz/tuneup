const ranges = require('../common/ranges');

const MidiWriter = require('midi-writer-js');

const bubble = require('../common/scales/bubble');

const invoke = () => {
    const track = new MidiWriter.Track();

    let scale = bubble.createScale(ranges.baritone.start, ranges.tenor.end);

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
