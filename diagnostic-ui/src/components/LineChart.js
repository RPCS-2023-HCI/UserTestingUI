import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { Container } from 'react-bootstrap';

Chart.register(...registerables);

function LineChart(props) {

    function getLabels() {
        let name = props.dataType;
        return props.data["Object"]["Item"][name]["time"];
    }

    function getDataset() {
        let name = props.dataType;
        return [
            {
                id: 1,
                label: props.dataType,
                data: props.data["Object"]["Item"][name]["value"],
            },
        ];
    }

    return (
        <Container>
            <h4 style={{textAlign: 'center', color: 'grey'}}>{props.title}</h4>
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
