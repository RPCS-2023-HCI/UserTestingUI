import React from 'react';
import { Button, Card } from 'react-bootstrap';
import GPSMap from './GPSMap';

function GPSTrackingWithButton(props) {
    const [isTracking, setIsTracking] = React.useState(false);

    return (
        <div>
            <h4 style={{textAlign: 'center'}}>GPS Tracking Trace of the Car</h4>
            <Card style={{width: '40vw', height: '60vh'}}>
                <GPSMap data={props.data} isDrawing={isTracking}/>
            </Card>
            <Button onClick={() => setIsTracking(true)}>Start</Button>
            <Button onClick={() => setIsTracking(false)}>Stop</Button>
        </div>
    );
}

export default GPSTrackingWithButton;