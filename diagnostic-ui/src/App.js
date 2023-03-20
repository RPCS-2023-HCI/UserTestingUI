import './App.css';
import React from 'react';
import Tabs from './components/ViewTabs/ViewTabs';
import MQTTManager from './components/MQTTManager/MQTTManager';
import StartStopButton from './components/StartStopButton/StartStopButton'; 

function App() {
  React.useEffect(() => {
    MQTTManager.connect();
  }, []);
  return (
    <div className='App'>
      <header className='App-Header'>
        <StartStopButton />
      </header>
      <div className='Video-Component'>
        <div className='Video-Toggle'>
          <Tabs />
        </div>
      </div>
    </div>
  );
}

export default App;
