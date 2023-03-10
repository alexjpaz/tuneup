import logo from './logo.svg';
import React from 'react';
import './App.css';
import MidiPlayer from './MidiPlayer';

function App() {
 

  const [ state, setState ] = React.useState("./test.mid");


  return (
    <div className="App">
      <MidiPlayer src={state} />
    </div>
  );
}

export default App;
