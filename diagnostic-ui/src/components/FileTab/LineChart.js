import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { Container } from 'react-bootstrap';
import Typography from '@mui/material/Typography';

Chart.register(...registerables);

function LineChart(props) {
  function splitTime(timeStamps) {
    return timeStamps.map((timeStamps) => timeStamps.split("T")[1]);
  }

  function getLabels() {
    let name = props.dataType;
    return splitTime(props.data[name]["time"]);
  }

  function getDataset() {
    let name = props.dataType;
  
    const abnormalPoints = new Set(props.data[name]["anomaly"]);
  
    // Assign different point properties depending on whether the index is in abnormalPoints
    const pointBackgroundColors = props.data[name]["value"].map((_, index) =>
      abnormalPoints.has(index) ? 'rgba(208, 49, 45, 0.7)' : 'rgba(85, 170, 255, 0.7)',
    );
    const pointBorderColors = props.data[name]["value"].map((_, index) =>
      abnormalPoints.has(index) ? 'rgba(208, 49, 45, 0.7)' : 'rgba(85, 170, 255, 0.7)',
    );
    const pointRadius = props.data[name]["value"].map((_, index) =>
      abnormalPoints.has(index) ? 4 : 3,
    );
  
    return [
      {
        id: 1,
        yAxisID: 'y',
        label: props.dataType,
        data: props.data[name]["value"],
        borderColor: 'rgba(85, 170, 255, 0.7)', // Add alpha value
        backgroundColor: 'rgba(85, 170, 255, 0.4)', // Add alpha value
        pointBorderColor: pointBorderColors,
        pointBackgroundColor: pointBackgroundColors,
        pointRadius: pointRadius,
      },
      {
        id: 2,
        label: 'Abnormal',
        data: [],
        backgroundColor: 'rgba(208, 49, 45, 0.7)', // Add alpha value
        borderWidth: 0, 
        pointRadius: 0, 
      },
      {
        id: 3,
        label: 'Mean',
        data: Array(props.data[name]["value"].length).fill(props.data[name]['stats']['mean']),
        borderColor: 'rgba(0, 128, 0, 0.4)',
        backgroundColor: 'rgba(0, 128, 0, 0.4)', // Use a green color for the background
        pointRadius: 0,
        borderDash: [5, 5],
      },
      {
        id: 4,
        label: 'Median',
        data: Array(props.data[name]["value"].length).fill(props.data[name]['stats']['median']),
        borderColor: 'rgba(116,71,0, 0.5)',
        backgroundColor: 'rgba(116,71,0, 0.5)', // Use a green color for the background
        pointRadius: 0,
        borderDash: [5, 5],
      },
    ];
  }

  return (
    <Container>
      <Typography style={{ textAlign: 'center', color: 'grey', marginTop: "1.2vh", fontWeight: "bold", marginBottom: "1vh"}}>
        {props.title}
      </Typography>
      <Line
        datasetIdKey="id"
        data={{
          labels: getLabels(),
          datasets: getDataset(),
        }}
      />
      <Typography style={{ textAlign: 'center', color: 'grey', marginTop: "1vh", fontSize: "small" }}>
        Min: {props.data[props.dataType]['stats']['minimum']}
        &nbsp; &nbsp;
        Max: {props.data[props.dataType]['stats']['maximum']}
        &nbsp; &nbsp;
        Mode: {props.data[props.dataType]['stats']['mode']}
        &nbsp; &nbsp;
        Std: {props.data[props.dataType]['stats']['std']}
      </Typography>
    </Container>
  );
}

export default LineChart;