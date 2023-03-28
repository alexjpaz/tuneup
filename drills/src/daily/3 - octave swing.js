const ranges = require('../common/ranges');

const { Interval, Note, Scale } = require("tonal");
const MidiWriter = require('midi-writer-js');

const unison = require('../common/scales/octave-swing');

const invoke = () => {
    const { start, end } = ranges.baritone;

    const track = new MidiWriter.Track();

    let scale = unison.createScale(start, end);

    let events = scale.map((event) => new MidiWriter.NoteEvent(event));

    track.addEvent(events);

    const write = new MidiWriter.Writer(track);

    return {
        name: `3. Octave Swing`,
        description: "Sing EE and switch to AH",
        data: write.dataUri(),
    };

};

module.exports = {
    invoke,
};
