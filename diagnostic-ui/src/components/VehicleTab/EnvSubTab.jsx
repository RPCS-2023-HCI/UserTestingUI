import * as React from 'react';
import { Typography, Paper, Stack } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import wscfg from '../../WebSocketConfig';

const GROUND_DATA_TOPIC = 'esp32/obpub';

function EnvSubTab() {

  const [elpTime, setElpTime] = React.useState('N/A');
  const [distOb1, setDistOb1] = React.useState('N/A');
  const [distOb2, setDistob2] = React.useState('N/A');

  // websocket updates
  const { sendMessage, lastMessage, readyState } = useWebSocket(wscfg.WS_URL, {
    share: true
  });

  React.useEffect(() => {
    if (lastMessage !== null) {
      try {
        let msg = JSON.parse(lastMessage.data);
        if (msg.topic == GROUND_DATA_TOPIC) {
          let data = JSON.parse(msg.data);
          setElpTime((prev) => data.elapsed_time);
          setDistOb1((prev) => data.Distance_Obs1);
          setDistOb2((prev) => data.Distance_Obs2);
        }
      } catch (e) {
        console.log("json parse error", e);
      }
    }
  }, [lastMessage, setElpTime, setDistOb1, setDistOb2]);

  
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
            Elapsed Time: {elpTime} milliseconds <br/>
            Distance to Obstacle 1: {distOb1} cm <br/>
            Distance to Obstacle 2: {distOb2} cm <br/>
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
