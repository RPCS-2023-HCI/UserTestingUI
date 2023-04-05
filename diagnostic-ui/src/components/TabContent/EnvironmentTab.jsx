import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function EnvironmentTab() {
  const [speed, setSpeed] = React.useState('N/A');
  const [acceleration, setAcceleration] = React.useState('N/A');
  const [direction, setDirection] = React.useState('N/A');

  const handleSpeedChange = (event, newSpeed) => {
    setSpeed(newSpeed);
  };
  const handleAccelerationChange = (event, newAcceleration) => {
    setAcceleration(newAcceleration);
  };
  const handleDirectionChange = (event, newDirection) => {
    setDirection(newDirection);
  };

  return ( 
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography variant="h6">Camera Feed</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography variant="h6">Base Readings (Live)</Typography>
          Speed: {speed} m/s<br/>
          Acceleration: {acceleration} m/s²<br />
          Direction: {direction}°<br />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EnvironmentTab;