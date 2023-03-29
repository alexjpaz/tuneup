const ranges = require('../common/ranges');

const MidiWriter = require('midi-writer-js');
const { createScale } = require('../common/scales/octave-half');

const invoke = () => {

  const track = new MidiWriter.Track();


  const start = ranges.baritone.start;
  const end = ranges.tenor.end;

  let scale = createScale(start, end);

  let events = scale.map((event) => new MidiWriter.NoteEvent(event));

  track.addEvent(events);

  const write = new MidiWriter.Writer(track);

  return {
    name: `6. Octave and half scale (Baritone)`,
    description: "Huh-Nng / Nay",
    data: write.dataUri(),
  };

};

module.exports = {
  invoke,
};
