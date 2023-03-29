const ranges = require('../common/ranges');

const MidiWriter = require('midi-writer-js');

const bubble = require('../common/scales/bubble');

const invoke = () => {
    const track = new MidiWriter.Track();

    const start = ranges.baritone.start;
    const end = ranges.tenor.end;

    let scale = bubble.createScale(start, end);

    let events = scale.map((event) => new MidiWriter.NoteEvent(event));

    track.addEvent(events);

    const write = new MidiWriter.Writer(track);

    return {
        name: `1. Bubble`,
        description: `Warmup with Bubble / Raspberry / VVV (${start}-${end})`,
        data: write.dataUri(),
    };

};

module.exports = {
    invoke,
};
