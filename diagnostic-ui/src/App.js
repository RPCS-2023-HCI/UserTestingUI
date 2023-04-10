import './App.css';
import React from 'react';
import Dashboard from './components/Dashboard';
import GPSMap from './components/GPSTracking';

function App() {
  
  return (
    <div className='App'>
      <Dashboard/>
      <GPSMap simID={"sim1"} />
    </div>

  );
}

export default App;
