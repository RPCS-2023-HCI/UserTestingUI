import './App.css';
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LineChart from './components/LineChart';
import Tabs from "./components/ViewTabs/ViewTabs";
import StartStopButton from './components/StartStopButton/StartStopButton'; 
import Graphs from "./components/Graphs/Graphs";

function App() {

  return (
    <div className='App'>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <StartStopButton />
          </Grid>
          <Grid item xs={10}>
            <Tabs />
          </Grid>
        </Grid>
        <div style={{ width: '50vw', height: '50vh' }}>
          <LineChart datavi={"Speed"} simulationId={"ExampleGraphTest"} />
          <LineChart dataType={"EngineTemperature"} simulationId={"ExampleGraphTest"} />
        </div>
        <div className='Graph'>
          <Graphs />
        </div>
      </Container>
    </div>
  );
}

export default App;
