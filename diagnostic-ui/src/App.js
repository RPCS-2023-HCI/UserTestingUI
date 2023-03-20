import './App.css';
import Tabs from "./components/tab component/Tabs";
import StartStopButton from './components/StartStopButton'; 

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
