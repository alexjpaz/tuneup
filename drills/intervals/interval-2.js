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

let iterations = 0;

let maxIterations = 10 // CALCULATE range where G4 is hit


const events = [];

let finalIteration = false;

let semitones = 0;
let maxSemitones = 1;

let REMOVE_THIS_NOTE = 2;

while(semitones++ < maxSemitones) {

  let scale = Scale.get(`${currentRootNote} major`).notes;

  events.push(new MidiWriter.NoteEvent({pitch: scale[0], duration: '2', velocity: '100'}));

  for(let i=2;i<8;i++) {

    const acsending = scale.slice(0,i);

    const silent = scale[REMOVE_THIS_NOTE] //

    const descending = scale.slice(1, i-1).reverse();

    acsending.forEach((note) => {
      if(note === silent) {
        events.push(new MidiWriter.NoteEvent({pitch: note, duration: '4', velocity: '1'}));
      } else {
        events.push(new MidiWriter.NoteEvent({pitch: note, duration: '4', velocity: '100'}));
      }
    });

    descending.forEach((note) => {
      if(note === silent) {
        events.push(new MidiWriter.NoteEvent({pitch: note, duration: '4', velocity: '1'}));
      } else {
        events.push(new MidiWriter.NoteEvent({pitch: note, duration: '4', velocity: '100'}));
      }
    });



    events.push(new MidiWriter.NoteEvent({pitch: scale[0], duration: '2', velocity: '100'}));
  }

  currentRootNote = Note.transpose(currentRootNote, Interval.fromSemitones(semitoneIncrease));

  currentRootNote = Note.simplify(currentRootNote);

}

track.addEvent(events, function(event, index) {
  return {sequential: true};
});

const write = new MidiWriter.Writer(track);


try {
  fs.writeFileSync('../../web/public/test.mid', write.buildFile());
} catch (err) {
  console.error(err);
}
