// this script will generate a scale that will skip a given interval
//

const fs = require('fs');

const { Interval, Note, Scale } = require("tonal");
const MidiWriter = require('midi-writer-js');

const track = new MidiWriter.Track();

const ranges = {
  baritone: {
    start: "G2",
    end: "G4",
  }
};

const { start, end } = ranges.baritone;

let currentRootNote = start;

let semitoneIncrease = 1;

let semitones = 0;
let maxSemitones = 24;

const events = [];

events.push(new MidiWriter.NoteEvent({pitch: currentRootNote, duration: '1', velocity: '100'}));

let intervalGhost = "5P";

while(semitones++ < maxSemitones) {

  events.push(new MidiWriter.NoteEvent({pitch: currentRootNote, duration: '2', velocity: '100'}));

  const rootNote5th = Note.transpose(currentRootNote, Interval.get(intervalGhost));

  events.push(new MidiWriter.NoteEvent({pitch: rootNote5th, duration: '2', velocity: '1'}));
  events.push(new MidiWriter.NoteEvent({pitch: rootNote5th, duration: '2', velocity: '100'}));
  
  currentRootNote = Note.transpose(currentRootNote, Interval.fromSemitones(semitoneIncrease));

  currentRootNote = Note.simplify(currentRootNote);
}

events.push(new MidiWriter.NoteEvent({pitch: currentRootNote, duration: '1', velocity: '100'}));


track.addEvent(events, function(event, index) {
  return {sequential: true};
});

const write = new MidiWriter.Writer(track);

try {
  fs.writeFileSync(`../../web/public/interval-${intervalGhost}-ghost.mid`, write.buildFile());
} catch (err) {
  console.error(err);
}

const invoke = () => {

};

module.exports = {
    invoke
};
