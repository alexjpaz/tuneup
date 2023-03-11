// this script will generate a scale that will skip a given interval
const fs = require('fs');

const ranges = require('./ranges');

const { Interval, Note, Scale } = require("tonal");
const MidiWriter = require('midi-writer-js');

const invoke = ({ interval }) => {
    const track = new MidiWriter.Track();
    
    const { start, end } = ranges.baritone;
    
    let currentRootNote = start;
    
    let semitoneIncrease = -1;
    
    let semitones = 24;

    currentRootNote = Note.transpose(currentRootNote, Interval.fromSemitones(semitones));
    currentRootNote = Note.simplify(currentRootNote);
    
    const events = [];
    
    events.push(new MidiWriter.NoteEvent({pitch: currentRootNote, duration: '1', velocity: '100'}));
    
    let intervalGhost = interval;
    
    while(--semitones > 0) {
    
      events.push(new MidiWriter.NoteEvent({pitch: currentRootNote, duration: '2', velocity: '100'}));
      events.push(new MidiWriter.NoteEvent({pitch: currentRootNote, duration: '2', velocity: '100'}));
    
      const rootNote5th = Note.transpose(currentRootNote, Interval.fromSemitones(- Interval.semitones(intervalGhost)));
    
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
    
    return {
      name: `ghost-interval-descending-${intervalGhost}`,
      data: write.dataUri(),
    };
};

module.exports = {
    invoke,
};