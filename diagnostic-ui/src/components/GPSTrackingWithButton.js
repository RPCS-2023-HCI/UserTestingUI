import React from 'react';
import { Button, Card } from 'react-bootstrap';
import GPSMap from './GPSMap';

function GPSTrackingWithButton(props) {
    const [isTracking, setIsTracking] = React.useState(false);

    return (
        <div>
            <Card style={{width: '40vw', height: '60vh', backgroundColor: '#f8f9fa'}}>
                <GPSMap simID={"sim1"} isDrawing={isTracking}/>
            </Card>
            <Button onClick={() => setIsTracking(true)}>Start</Button>
            <Button onClick={() => setIsTracking(false)}>Stop</Button>
        </div>
    );
}

export default GPSTrackingWithButton;