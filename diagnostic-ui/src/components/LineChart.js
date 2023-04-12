import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { Container } from 'react-bootstrap';

Chart.register(...registerables);
const SERVER = 'https://fwo91hdzog.execute-api.us-east-1.amazonaws.com/test/dynamodbmanager';

function LineChart(props) {
    const [response, setResponse] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const payload = {
            "SimulationId": props.simulationId,
            "content": props.dataType
          }
          const data = {
            "operation": "get_simulation",
            "payload": payload
          }
        
          fetch(SERVER, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
            .then(data => {
                setResponse(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    function getLabels() {
        if (response === null || response[props.dataType] === undefined) {
            setNotFound(true);
            return [];
        }
        let name = props.dataType;
        return response[name]["time"];
    }

    function getDataset() {
        if (response === null || response[props.dataType] === undefined) {
            setNotFound(true);
            return [];
        }
        let name = props.dataType;
        return [
            {
                id: 1,
                label: props.dataType,
                data: response[name]["value"],
            },
        ];
    }

    if (notFound) {
        return <div>Simulation not found</div>
    }

    return (
        <Container>
            <h4 style={{textAlign: 'center'}}>{props.title}</h4>
            <Line
            datasetIdKey='id'
            data={{
                labels: getLabels(),
                datasets: getDataset(),
            }}
            />
        </Container>
    );
}

export default LineChart;
