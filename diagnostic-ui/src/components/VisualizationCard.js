import React from 'react';
import { Row } from 'react-bootstrap';
import LineChart from './LineChart';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

function VisualizationCard(props) {
    const { data, notFound } = props;

    if (notFound) {
        return (
            <Row style={{marginTop: '1vh', width: '60vw'}}>
                <Alert severity="error">Simulation not found, try different simulation Id!</Alert>
            </Row>
        );
    }

    return (
        <Card style={{width: '76vw', marginTop: '5vh', height: '50vh', borderRadius: '10px'}}>
            <Row style={{width: '85vw', display: 'flex', marginTop: '1.5vh'}}>
                <Typography variant="button" style={{marginLeft: '1.5vw', fontSize: '1.2vw', color: '#1870d5'}}>
                    Visualization of the Car Run
                </Typography>
            </Row>
            <Row style={{width: '85vw', display: 'flex', marginTop: '1vh'}}>
                <Row style={{width: '33vw', marginLeft: '2vw'}}>
                    <LineChart dataType={"Speed"} data={data} title={"Speed of the Car Run Over Time"}/>
                </Row>
                <Row style={{width: '33vw', marginLeft: '6vw'}}>
                    <LineChart dataType={"Accel"} data={data} title={"Acceleration of the Car Run Over Time"}/>
                </Row>
            </Row>
        </Card>
    );
}

export default VisualizationCard;
