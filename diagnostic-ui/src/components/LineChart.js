import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';

Chart.register(...registerables);
const SERVER = 'https://fwo91hdzog.execute-api.us-east-1.amazonaws.com/test/dynamodbmanager';

function LineChart(props) {
    const [response, setResponse] = useState({});

    useEffect(() => {
        const payload = {
            "SimulationId": "ExampleGraphTest",
            "content": ["Speed", "ServoAngle", "Accel"]
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
                console.log('Success:', data);
                setResponse(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    function getLabels() {
        console.log("response: ", response.Speed["time"]);
        return response.Speed["time"];
    }

    function getDataset() {
        return [
            {
                id: 1,
                label: '',
                data: response.Speed["value"],
            },
        ];
    }

    return (
        <Line
        datasetIdKey='id'
        data={{
            labels: getLabels(),
            datasets: getDataset(),
        }}
        />
    );
}

export default LineChart;
