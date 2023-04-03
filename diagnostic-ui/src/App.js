import './App.css';
import React from 'react';
import LineChart from './components/LineChart';
import Tabs from "./components/ViewTabs/ViewTabs";
import StartStopButton from './components/StartStopButton/StartStopButton'; 
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className='App'>
      <Dashboard/>
    </div>

  );
}

export default App;
