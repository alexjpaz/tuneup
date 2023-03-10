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
  new MidiWriter.NoteEvent({pitch: Scale.get("C3 major").notes, duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: Scale.get("C3 major").notes.reverse(), duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: ['C3'], duration: '1', velocity: '100'}),
new MidiWriter.NoteEvent({pitch: ['C3'], duration: '1', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: Scale.get("C3 major").notes, duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: Scale.get("C3 major").notes.reverse(), duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: ['C3'], duration: '1', velocity: '100'}),
new MidiWriter.NoteEvent({pitch: ['C3'], duration: '1', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: Scale.get("C6 major").notes, duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: Scale.get("C3 major").notes.reverse(), duration: '4', velocity: '100'}),
  new MidiWriter.NoteEvent({pitch: ['C3'], duration: '1', velocity: '100'}),
], function(event, index) {
  return {sequential: true};
});

const write = new MidiWriter.Writer(track);


try {
  fs.writeFileSync('../web/public/test.mid', write.buildFile());
} catch (err) {
  console.error(err);
}
