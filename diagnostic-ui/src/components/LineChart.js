import React from 'react';
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
        id: 2, 
        yAxisID: 'y2',
        label: 'Abnormal',
        data: [{ x: 0, y: 0 }],
        borderColor: 'rgba(208, 49, 45, 0.7)', 
        backgroundColor: 'rgba(208, 49, 45, 0.7)',
        pointBorderColor: 'rgba(208, 49, 45, 0.7)', 
        pointBackgroundColor: 'rgba(208, 49, 45, 0.7)', 
        pointRadius: 3,
      },
      {
        id: 1, 
        yAxisID: 'y',
        label: props.dataType,
        data: props.data["Object"]["Item"][name]["value"],
        borderColor: 'rgba(85, 170, 255, 0.7)', 
        backgroundColor: 'rgba(85, 170, 255, 0.4)', 
        pointBorderColor: 'rgba(85, 170, 255, 0.7)',
        pointBackgroundColor: 'rgba(85, 170, 255, 0.7)',
        pointRadius: 3,
      },
    ];
  }

  return (
    <Container>
      <h4 style={{ textAlign: 'center', color: 'grey' }}>{props.title}</h4>
      <Line
        datasetIdKey="id"
        data={{
          labels: getLabels(),
          datasets: getDataset(),
        }}
        options={{
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y',
            },
            y2: {
              type: 'linear',
              display: false,
              position: 'right',
              id: 'y2',
              grid: {
                drawOnChartArea: false,
              },
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        }}
      />
    </Container>
  );
}

export default LineChart;