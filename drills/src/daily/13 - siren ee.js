const ranges = require('../common/ranges');

const MidiWriter = require('midi-writer-js');
const { createScale } = require('../common/scales/siren');

const invoke = () => {

  const track = new MidiWriter.Track();

  const start = ranges.tenor.start;
  const end = ranges.tenor.end;

  let scale = createScale(start, end);

  let events = scale.map((event) => new MidiWriter.NoteEvent(event));

  track.addEvent(events);

  const write = new MidiWriter.Writer(track);

  return {
    name: `13. Siren Tenor`,
    start,
    end,
    description: "EE",
    data: write.dataUri(),
  };

};

module.exports = {
  invoke,
};
