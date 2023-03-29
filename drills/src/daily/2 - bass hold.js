const ranges = require('../common/ranges');

const { Interval, Note, Scale } = require("tonal");
const MidiWriter = require('midi-writer-js');

const unison = require('../common/scales/unison');
const { baritone } = require('../common/ranges');

const invoke = () => {
    
    const track = new MidiWriter.Track();

    let scale = unison.createScale(ranges.bass.start, ranges.baritone.end);

    let events = scale.map((event) => new MidiWriter.NoteEvent(event));

    track.addEvent(events);

    const write = new MidiWriter.Writer(track);

    return {
        name: `2. Bass Hold`,
        description: "Hold Vowels (AH, AA)",
        data: write.dataUri(),
    };

};

module.exports = {
    invoke,
};
