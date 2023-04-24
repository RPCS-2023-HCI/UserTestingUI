import React from 'react';
import { Stack, Divider, Typography } from '@mui/material';

import StatusBlock from './StatusBlock';
import SensorToggle from './SensorToggle';
import TestName from './TestName';
import StartStopButton from './StartStopButton/StartStopButton';

function VehicleStatus() {
  return (  
    <Stack
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
    >
      <div>
        <span style={{ fontWeight: 'bold', paddingBottom: '10px'}}>Vehicle Status</span>
        <StatusBlock label="Battery" sensorOn="true" />
        <StatusBlock label="LiDAR" sensorOn="false" />
        <StatusBlock label="GPS" sensorOn="false" />
        {/* <StatusBlock label="GNSS" sensorOn="true" /> */}
      </div>
      
      <div>
        <span style={{ fontWeight: 'bold' }}>Environment Status</span>
        <StatusBlock label="Ultrasonic 1-A" sensorOn="true" />
        <StatusBlock label="Ultrasonic 1-B" sensorOn="true" />
        <StatusBlock label="Ultrasonic 2-A" sensorOn="true" />
        <StatusBlock label="Ultrasonic 2-B" sensorOn="true" />
        {/* <StatusBlock label="Ultrasonic 3-A" sensorOn="true" />
        <StatusBlock label="Ultrasonic 3-B" sensorOn="true" />
        <StatusBlock label="Ultrasonic 4-A" sensorOn="true" />
        <StatusBlock label="Ultrasonic 4-B" sensorOn="true" /> */}
      </div>
      
      <div>
        <span style={{ fontWeight: 'bold' }}>Obstacle Configuration</span>
        <SensorToggle label="S1 Obstacle" />
        <SensorToggle label="S2 Obstacle" />
        {/* <SensorToggle label="S3 Obstacle" />
        <SensorToggle label="S4 Obstacle" /> */}
      </div>
      
      <div>
        <span style={{ fontWeight: 'bold' }}>Test Name:</span>
        <TestName />
        <br/>
        <StartStopButton />
      </div>
    </Stack>
  );
}

export default VehicleStatus;