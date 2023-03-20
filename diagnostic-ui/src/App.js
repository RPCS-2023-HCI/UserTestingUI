import './App.css';
import Tabs from "./components/ViewTabs/ViewTabs";
import StartStopButton from './components/StartStopButton/StartStopButton'; 
import Graphs from "./components/Graphs/Graphs";

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
        <div className='Graph'>
          <Graphs />
        </div>
      </div>
    </div>
  );
}

export default App;
