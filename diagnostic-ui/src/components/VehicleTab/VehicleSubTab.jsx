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
const VEHICLE_STEERING_TOPIC = 'sensors/servo_position_command';
const VEHICLE_BATTERY_TOPIC = 'esp32/vp_pub';

function VehicleSubTab() {
  // BASE DATA
  const [speed, setSpeed] = React.useState('N/A');
  const [distTraveled, setDistTraveled] = React.useState('N/A');
  const [steeringAngle, setAngle] = React.useState('N/A');
  const [vCell1, setvCell1] = React.useState('N/A');
  const [vCell2, setvCell2] = React.useState('N/A');
  const [vCell3, setvCell3] = React.useState('N/A');
  const [vPack, setvPack] = React.useState('N/A');
  const [iPack, setiPack] = React.useState('N/A');



  // DETAIL DATA
  const [yaw, setYaw] = React.useState('N/A');
  const [roll, setRoll] = React.useState('N/A');
  const [pitch, setPitch] = React.useState('N/A');

  // BASE DATA HANDLERS
  const handleSpeedChange = (event, newSpeed) => {
    setSpeed(newSpeed);
  };
  const handleAccelerationChange = (event, newAcceleration) => {
    setDistTraveled(newAcceleration);
  };
  const handleDirectionChange = (event, newDirection) => {
    setAngle(newDirection);
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
          setDistTraveled((prev) => {
            return `${data.state.distance_traveled}`;
          });
          // Waiting on car platform team to send us battery state
        } else if (msg.topic == VEHICLE_STEERING_TOPIC) {
          let data = YAML.parse(JSON.parse(msg.data));
          setAngle((prev) => data.data);
        } else if (msg.topic == VEHICLE_BATTERY_TOPIC) {
          let data = JSON.parse(msg.data);
          setvCell1((prev) => data.vCell1);
          setvCell2((prev) => data.vCell2);
          setvCell3((prev) => data.vCell3);
          setvPack((prev) => data.vPack);
          setiPack((prev) => data.iPack);
        }
      } catch (e) {
        console.log("json parse error", e);
      }
    }
  }, [lastMessage, setSpeed, setDistTraveled, setAngle, setvCell1, setvCell2, setvCell3, setvPack, setiPack]);

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
          Distance Traveled: {distTraveled}<br />
          Steering Angle: {steeringAngle}°<br />
          <br />
          Battery state:<br />
          vCell1: {vCell1} V<br />
          vCell2: {vCell2} V<br />
          vCell3: {vCell3} V<br />
          vPack: {vPack} V<br />
          iPack: {iPack} mA<br />



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
