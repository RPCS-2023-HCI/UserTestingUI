import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';

Chart.register(...registerables);

function LineChart(props) {
  const chartRef = useRef();


  return (
    <Line
    datasetIdKey='id'
    data={{
        labels: ['Jun', 'Jul', 'Aug'],
        datasets: [
        {
            id: 1,
            label: '',
            data: [5, 6, 7],
        },
        {
            id: 2,
            label: '',
            data: [3, 2, 1],
        },
        ],
    }}
    />
  );
}

export default LineChart;
