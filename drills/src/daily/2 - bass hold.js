const ranges = require('../common/ranges');

const MidiWriter = require('midi-writer-js');

const unison = require('../common/scales/unison');

const invoke = () => {

    const track = new MidiWriter.Track();

    const start = ranges.bass.start;
    const end = ranges.baritone.end;

    let scale = unison.createScale(start, end);

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
