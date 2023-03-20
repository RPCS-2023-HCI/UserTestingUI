import './App.css';
import React from 'react';
import Tabs from './components/ViewTabs/ViewTabs';
import MQTTManager from './components/MQTTManager/MQTTManager';
import StartStopButton from './components/StartStopButton/StartStopButton'; 
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LineChart from './components/LineChart';

function App() {
  React.useEffect(() => {
    MQTTManager.connect();
  }, []);
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
          <LineChart dataType={"Speed"} simulationId={"ExampleGraphTest"} />
          <LineChart dataType={"EngineTemperature"} simulationId={"ExampleGraphTest"} />
        </div>
      </Container>
    </div>
  );
}

export default App;
