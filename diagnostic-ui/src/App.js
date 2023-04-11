import './App.css';
import React from 'react';
import Dashboard from './components/Dashboard';
import GPSMap from './components/GPSTracking';
import LineChart from './components/LineChart';
import SimulationAnalysisPage from './components/SimulationAnalysisPage';

function App() {
  
  return (
    <div className='App'>
      <Dashboard/>
      <SimulationAnalysisPage/>
    </div>

  );
}

export default App;
