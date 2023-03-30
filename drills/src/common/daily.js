const MidiWriter = require('midi-writer-js');

const invoke = ({
    name,
    description,
    start,
    end,
    scale: [],
}) => {
    const track = new MidiWriter.Track();

    const start = ranges.baritone.start;
    const end = ranges.tenor.end;

    let events = scale.map((event) => new MidiWriter.NoteEvent(event));

    track.addEvent(events);

    const write = new MidiWriter.Writer(track);

    return {
        name,
        description,
        data: write.dataUri(),
    };

};

module.exports = {
    invoke,
};
