import * as React from 'react';
import {Grid, Typography, Paper, Stack, Box} from '@mui/material';

function EnvSubTab() {

  const [reading1A, setReading1A] = React.useState('N/A');
  const [reading1B, setReading1B] = React.useState('N/A');
  const [reading2A, setReading2A] = React.useState('N/A');
  const [reading2B, setReading2B] = React.useState('N/A');

  return ( 
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 300,
          }}
        >
            <Typography variant="h6">Track Sensor Readings</Typography>
            <br/>
            Ultrasonic Sensor 1-A: {reading1A} in <br/>
            Ultrasonic Sensor 1-B: {reading1B} in <br/>
            Ultrasonic Sensor 2-A: {reading2A} in<br/>
            Ultrasonic Sensor 2-B: {reading2B} in<br/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 300,
          }}
        >
            <Typography variant="h6">Track Sector</Typography>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default EnvSubTab;