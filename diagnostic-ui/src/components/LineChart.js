import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';

Chart.register(...registerables);
const SERVER = 'https://fwo91hdzog.execute-api.us-east-1.amazonaws.com/test/dynamodbmanager';

function LineChart(props) {
    const [response, setResponse] = useState(null);

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
                console.log('Success:', data);
                setResponse(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    function getLabels() {
        if (response === null) {
            return [];
        }

        let name = props.dataType;
        console.log("label: ", response[name]["time"]);
        return response[name]["time"];
    }

    function getDataset() {
        if (response === null) {
            return [];
        }

        let name = props.dataType;
        console.log("val: ", response[name]["value"]);
        return [
            {
                id: 1,
                label: props.dataType,
                data: response[name]["value"],
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