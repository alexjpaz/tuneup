const ranges = require('../common/ranges');

const { Interval, Note, Scale } = require("tonal");
const MidiWriter = require('midi-writer-js');

const invoke = () => {
  const track = new MidiWriter.Track();

  const { start, end } = ranges.baritone;

  let currentRootNote = start;

  let semitoneIncrease = 1;

  let iterations = 0;

  const events = [];

  let finalIteration = false;

  let semitones = 0;
  let maxSemitones = 14;

  while(semitones++ < maxSemitones) {

    let scale = Scale.get(`${currentRootNote} chromatic`).notes;

    let ocataveNote = Note.transpose(currentRootNote, Interval.fromSemitones(12));

    scale.push(ocataveNote);

    events.push(new MidiWriter.NoteEvent({pitch: scale[0], duration: '2', velocity: '100'}));

    events.push(new MidiWriter.NoteEvent({pitch: scale, duration: '8', velocity: '100'}));

    events.push(new MidiWriter.NoteEvent({pitch: scale.slice(1,scale.length - 1).reverse(), duration: '8', velocity: '100'}));

    events.push(new MidiWriter.NoteEvent({pitch: scale[0], duration: '2', velocity: '100'}));

    currentRootNote = Note.transpose(currentRootNote, Interval.fromSemitones(semitoneIncrease));

    currentRootNote = Note.simplify(currentRootNote);

  }

  track.addEvent(events, function(event, index) {
    return {sequential: true};
  });

  const write = new MidiWriter.Writer(track);

  return {
    name: `Chromatic Scale (Baritone)`,
    description: "Gug",
    data: write.dataUri(),
  };

};

module.exports = {
  invoke,
};
