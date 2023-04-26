import * as React from 'react';
import { Typography, Paper, Stack } from '@mui/material';

function EnvSubTab() {

  const [elpTime, setElpTime] = React.useState('N/A');
  const [distOb1, setDistOb1] = React.useState('N/A');
  const [distOb2, setDistob2] = React.useState('N/A');

  return ( 
    <Stack direction='row' spacing={3}>
        <Paper
          sx={{
            minWidth: '30vw',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 300,
          }}
        >
            <Typography variant="h6">Track Sensor Readings</Typography>
            <br/>
            Elapsed Time: {elpTime} s <br/>
            Distance to Obstacle 1: {distOb1} in <br/>
            Distance to Obstacle 2: {distOb2} in <br/>
        </Paper>
        <Paper
          sx={{
            minWidth: '30vw',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 300,
          }}
        >
            <Typography variant="h6">Track Sector</Typography>
        </Paper>
    </Stack>
  );
}

export default EnvSubTab;