const ranges = require('../common/ranges');

const MidiWriter = require('midi-writer-js');

const { createScale } = require('../common/scales/chromatic');

const invoke = () => {
    const track = new MidiWriter.Track();

    const start = ranges.bass.start;
    const end = ranges.bass.end;

    let scale = createScale(start, end);

    let events = scale.map((event) => new MidiWriter.NoteEvent(event));

    track.addEvent(events);

    const write = new MidiWriter.Writer(track);

    return {
        name: `3. Bass Gug`,
        start,
        end,
        description: "Gug",
        data: write.dataUri(),
    };

};

module.exports = {
    invoke,
};
