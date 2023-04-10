import './App.css';
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LineChart from './components/LineChart';
import Tabs from "./components/ViewTabs/ViewTabs";
import StartStopButton from './components/StartStopButton/StartStopButton'; 
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar/>
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
        <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921" id="vlc" width="640" height="480">
          <embed type="application/x-vlc-plugin" name="vlc" width="640" height="480" />
        </object>
      </Container>
    </div>

  );
}

export default App;
