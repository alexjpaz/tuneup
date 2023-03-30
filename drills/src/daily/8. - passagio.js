const ranges = require('../common/ranges');

const MidiWriter = require('midi-writer-js');
const { createScale } = require('../common/scales/pentatonic-major');

const invoke = () => {

  const track = new MidiWriter.Track();

  const start = ranges.tenor.start;
  const end = ranges.tenor.end;

  let scale = createScale(start, end);

  let events = scale.map((event) => new MidiWriter.NoteEvent(event));

  track.addEvent(events);

  const write = new MidiWriter.Writer(track);

  return {
    name: `8. NNNh / Ayyy Pentatonic`,
    start,
    end,
    description: "Huh-Nng / Nay",
    data: write.dataUri(),
  };

};

module.exports = {
  invoke,
};
