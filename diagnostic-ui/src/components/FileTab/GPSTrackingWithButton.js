import React from 'react';
import { Card, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import GPSMap from './GPSMap';
import Typography from '@mui/material/Typography';

function GPSTrackingWithButton(props) {
    const [isTracking, setIsTracking] = React.useState(false);

    return (
        <Box
        sx={{padding: "2.5vh"}}
        >
            <Row 
            
            // style={{width: '85vw', display: 'flex', marginTop: '2.5%'}}
            >
                <Typography variant="button" style={{fontSize: '1.2vw', color: '#1870d5'}}>
                    Vehicle Path Tracking
                </Typography>
            </Row>
            <Card style={{width: '30vw', height: '50vh', margin: 'auto'}}>
                <GPSMap data={props.data} isDrawing={isTracking}/>
            </Card>
            <Row style={{display: 'flex', justifyContent: 'right', marginTop: '1vh'}}>
                <Button variant="contained" style={{marginRight: '1.5vh'}} onClick={() => setIsTracking(true)}>Start</Button>
                <Button variant="contained" style={{marginRight: '2vh'}} onClick={() => setIsTracking(false)}>Stop</Button>
            </Row>
        </Box>
    );
}

export default GPSTrackingWithButton;