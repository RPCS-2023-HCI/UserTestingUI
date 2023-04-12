import React from 'react';
import { Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import GPSMap from './GPSMap';

function GPSTrackingWithButton(props) {
    const [isTracking, setIsTracking] = React.useState(false);

    return (
        <div>
            <h4 style={{textAlign: 'center'}}>GPS Tracking Trace of the Car</h4>
            <Card style={{width: '40vw', height: '60vh'}}>
                <GPSMap data={props.data} isDrawing={isTracking}/>
            </Card>
            <Button variant="outlined" onClick={() => setIsTracking(true)}>Start</Button>
            <Button variant="outlined" onClick={() => setIsTracking(false)}>Stop</Button>
        </div>
    );
}

export default GPSTrackingWithButton;