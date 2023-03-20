import './App.css';
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
    </div>
  );
}

export default App;
