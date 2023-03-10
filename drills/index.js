const fs = require('fs');

const { Interval, Note, Scale } = require("tonal");
const MidiWriter = require('midi-writer-js');

const track = new MidiWriter.Track();

const range = {
  start: "G2",
  end: "G4",
};

track.addEvent([
  new MidiWriter.NoteEvent({pitch: ['C3'], duration: '1', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: [
    'C3',
    'D3',
    'E3',
    'F3',
    'G3',
    'A3',
    'B3',
    'C4',
    'B3',
    'A3',
    'G3',
    'F3',
    'E3',
    'D3',
    'C3',
  ], duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: ['C3'], duration: '1', velocity: '100'}),
], function(event, index) {
  return {sequential: true};
}
);

const write = new MidiWriter.Writer(track);


try {
  fs.writeFileSync('./test.mid', write.buildFile());
} catch (err) {
  console.error(err);
}
