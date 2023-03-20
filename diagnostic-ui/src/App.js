import './App.css';
import LineChart from './components/LineChart';
import StartStopButton from './components/StartStopButton'; 
import React, { useState } from 'react';

function App() {

  return (
    <div className="App">
      <header className="App-Header">
          
      </header>
      <StartStopButton />

      <div style={{width: '50vw', height: '50vh'}}>
        <LineChart/>
      </div>
    </div>
  );
}

export default App;
