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
  let maxSemitones = 13;

  while(semitones++ < maxSemitones) {

    let scale = [
        currentRootNote,
        Note.transpose(currentRootNote, Interval.get("M3")),
        Note.transpose(currentRootNote, Interval.get("P5")),
    ];
    
    let ocataveNote = Note.transpose(currentRootNote, Interval.fromSemitones(12));

    scale.push(ocataveNote);

    events.push(new MidiWriter.NoteEvent({pitch: scale[0], duration: '2', velocity: '100'}));

    for(var i=0; i<3; i++) {
      events.push(new MidiWriter.NoteEvent({pitch: scale, duration: 'd8', velocity: '100'}));
      events.push(new MidiWriter.NoteEvent({pitch: scale.slice(1,scale.length - 1).reverse(), duration: 'd8', velocity: '100'}));
    }
    
    events.push(new MidiWriter.NoteEvent({pitch: scale[0], duration: '2', velocity: '100'}));

    currentRootNote = Note.transpose(currentRootNote, Interval.fromSemitones(semitoneIncrease));

    currentRootNote = Note.simplify(currentRootNote);

  }

  track.addEvent(events, function(event, index) {
    return {sequential: true};
  });

  const write = new MidiWriter.Writer(track);

  return {
    name: `Octave and half scale triple (Baritone)`,
    description: "Bub / Bup",
    data: write.dataUri(),
  };

};

module.exports = {
  invoke,
};
