import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import VideoComponent from '../VideoComponent';
import ThreeViewer from '../ThreeViewer';
import useWebSocket from 'react-use-websocket';
import wscfg from '../../WebSocketConfig';
import YAML from 'yaml';
import PositionTracking from './PositionTracking';

const VEHICLE_INFO_TOPIC = 'sensors/core';

function VehicleSubTab() {
  // BASE DATA
  const [speed, setSpeed] = React.useState('N/A');
  const [acceleration, setAcceleration] = React.useState('N/A');
  const [direction, setDirection] = React.useState('N/A');
  const [charge, setCharge] = React.useState('N/A');

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

  // websocket updates
  const { sendMessage, lastMessage, readyState } = useWebSocket(wscfg.WS_URL, {
    share: true
  });

  React.useEffect(() => {
    if (lastMessage !== null) {
      try {
        let msg = JSON.parse(lastMessage.data);
        if (msg.topic == VEHICLE_INFO_TOPIC) {
          let data = YAML.parse(JSON.parse(msg.data));
          setSpeed((prev) => data.state.speed.toFixed(2));
          setAcceleration((prev) => {
            return `${data.state.current_motor}`;
          });
          setDirection((prev) => {
            return `${data.state.duty_cycle}`;
          });
          setCharge((prev) => {
            return `${data.state.charge_drawn}/${data.state.charge_regen}`;
          });
        }
      } catch (e) {
        console.log("json parse error", e);
      }
    }
  }, [lastMessage, setSpeed, setAcceleration, setDirection, setCharge]);

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
          Battery state: {charge}<br />
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
          <ThreeViewer />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '500px',
          }}
        >
          <Typography variant="h6">Position Tracking</Typography>
          <PositionTracking />
        </Paper>

      </Grid>
    </Grid>
  );
}

export default VehicleSubTab;
