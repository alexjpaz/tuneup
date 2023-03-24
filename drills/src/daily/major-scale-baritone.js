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

    let scale = Scale.get(`${currentRootNote} major`).notes;

    let ocataveNote = Note.transpose(currentRootNote, Interval.fromSemitones(12));

    scale.push(ocataveNote);

    events.push(new MidiWriter.NoteEvent({pitch: scale[0], duration: '2', velocity: '100'}));

    for(let i=2;i<scale.length + 1; i++) {

      events.push(new MidiWriter.NoteEvent({pitch: scale.slice(0,i), duration: '4', velocity: '100'}));

      events.push(new MidiWriter.NoteEvent({pitch: scale.slice(1,i-1).reverse(), duration: '4', velocity: '100'}));

      events.push(new MidiWriter.NoteEvent({pitch: scale[0], duration: '2', velocity: '100'}));
    }

    currentRootNote = Note.transpose(currentRootNote, Interval.fromSemitones(semitoneIncrease));

    currentRootNote = Note.simplify(currentRootNote);

  }

  track.addEvent(events, function(event, index) {
    return {sequential: true};
  });

  const write = new MidiWriter.Writer(track);

  return {
    name: `Interval Identification on Major Scale (Baritone)`,
    description: "1-2-3-4-5-6-7-8 / do-re-mi-fa-so-la-ti-do",
    data: write.dataUri(),
  };

};

module.exports = {
  invoke,
};
