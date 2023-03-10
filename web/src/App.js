import logo from './logo.svg';
import React from 'react';
import './App.css';
import MidiPlayer from './MidiPlayer';

function App() {
 

  const [ state, setState ] = React.useState("./test.mid");

  const onClick = () => {
    setState("./test.mid");
  }

  return (
    <div className="App">
      <midi-visualizer type="piano-roll" id="main-midi-visualizer2"></midi-visualizer>
      <MidiPlayer src={state} />
      <button onClick={onClick}>change</button>
    </div>
  );
}

export default App;
