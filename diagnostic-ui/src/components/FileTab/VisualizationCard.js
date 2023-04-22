import React from 'react';
import { Row } from 'react-bootstrap';
import LineChart from './LineChart';
import Alert from '@mui/material/Alert';

function VisualizationCard(props) {
    const { data, notFound } = props;

    console.log(data);

    if (notFound) {
        return (
            <Row style={{marginTop: '1vh', width: '60vw'}}>
                <Alert severity="error">Simulation not found, try different simulation Id!</Alert>
            </Row>
        );
    }

    return (
        <Row style={{width: '85vw', display: 'flex'}}>
            <Row style={{width: '40vw', marginLeft: '2vw'}}>
                <LineChart dataType={"Speed"} data={data} title={"Speed of the Car Run Over Time"}/>
            </Row>
            <Row style={{width: '40vw', marginLeft: '8vw'}}>
                <LineChart dataType={"Accel"} data={data} title={"Acceleration of the Car Run Over Time"}/>
            </Row>
        </Row>
    );
}

export default VisualizationCard;
