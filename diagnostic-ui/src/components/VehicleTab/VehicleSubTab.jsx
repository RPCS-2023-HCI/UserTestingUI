import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import VideoComponent from '../VideoComponent';

function VehicleSubTab() {
  // BASE DATA
  const [speed, setSpeed] = React.useState('N/A');
  const [acceleration, setAcceleration] = React.useState('N/A');
  const [direction, setDirection] = React.useState('N/A');

  // DETAIL DATA
  const [yaw, setYaw] = React.useState('N/A');
  const [roll, setRoll] = React.useState('N/A');
  const [pitch, setPitch] = React.useState('N/A');

  // BASE DATA HANDLERS
  const handleSpeedChange = (event, newSpeed) => {
    setSpeed(newSpeed);
  };
  const handleAccelerationChange = (event, newAcceleration) => {
    setAcceleration(newAcceleration);
  };
  const handleDirectionChange = (event, newDirection) => {
    setDirection(newDirection);
  };

  //DETAIL DATA HANDLERS
  const handleYawChange = (event, newYaw) => {
    setSpeed(newYaw);
  };
  const handleRollChange = (event, newRoll) => {
    setSpeed(newRoll);
  };
  const handlePitchChange = (event, newPitch) => {
    setSpeed(newPitch);
  };

  return ( 
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
          }}
        >
          <Typography variant="h6">Camera Feed</Typography>
          <VideoComponent/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
          }}
        >
          <Typography variant="h6">Base Readings (Live)</Typography>
          Speed: {speed} m/s<br/>
          Acceleration: {acceleration} m/s²<br />
          Direction: {direction}°<br />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography variant="h6">Detailed Readings</Typography>
          Yaw: {yaw}°<br />
          Roll: {roll}°<br />
          Pitch: {pitch}°<br />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography variant="h6">Position Tracking</Typography>
          - Data Analysis GPS Component Goes Here -
        </Paper>

      </Grid>
    </Grid>
  );
}

export default VehicleSubTab;