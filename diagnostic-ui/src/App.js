import './App.css';
import React, { useState } from 'react';
import LineChart from './components/LineChart';
import Tabs from "./components/ViewTabs/ViewTabs";
import StartStopButton from './components/StartStopButton/StartStopButton'; 

function App() {

  return (
    <div className='App'>
      <header className="App-Header">
        <StartStopButton />
      </header>

      <div className='Video-Component'>
        <div className='Video-Toggle'>
          <Tabs />
        </div>
      </div>

      <div style={{ width: '50vw', height: '50vh' }}>
        <LineChart dataType={"Speed"} simulationId={"ExampleGraphTest"} />
        <LineChart dataType={"EngineTemperature"} simulationId={"ExampleGraphTest"} />
      </div>
    </div>
  );
}

export default App;
