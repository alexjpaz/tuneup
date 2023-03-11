
import React from 'react';
import './App.css';
import DrillList from './DrillList';
import MidiPlayer from './MidiPlayer';

function App() {
 

  const [ state, setState ] = React.useState("./test.mid");


  return (
    <div className="App">
      <div >
        <MidiPlayer src={state} />
      </div>
      <div>
      <DrillList onSelected={setState} />
      </div>
    </div>
  );
}

export default App;
