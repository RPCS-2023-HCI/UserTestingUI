// Reference: 
// https://medium.com/@vitaliysteffensen/react-js-how-to-add-an-image-a-beginners-guide-66334f1d18be
// https://www.fusioncharts.com/charts/line-area-charts/simple-line-chart?framework=react

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

const chartData = [
    {
      label: "0",
      value: "0"
    },
    {
      label: "5",
      value: "5"
    },
    {
      label: "10",
      value: "8"
    },
    {
      label: "15",
      value: "10"
    },
    {
      label: "20",
      value: "9"
    },
    {
      label: "25",
      value: "3"
    },
    {
      label: "30",
      value: "7"
    },
    {
      label: "35",
      value: "9"
    },
    {
      label: "40",
      value: "11"
    },
    {
      label: "45",
      value: "7"
    },
    {
      label: "50",
      value: "0"
    }
  ];

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const chartConfigs = {
  type: 'line',
  width: 800,
  height: 300,
  dataFormat: 'json',
  dataSource: {
    // Chart Configuration
    chart: {
      //Set the chart caption
      caption: "Speed during the last lap",
      //Set the chart subcaption
      subCaption: "In meters / second",
      //Set the x-axis name
      xAxisName: "Time",
      //Set the y-axis name
      yAxisName: "Speed",
      numberSuffix: "",
      //Set the theme for your chart
      theme: "gammel"
    },
    // Chart Data
    data: chartData
  }
};

const Graphs = () => {
    return (
        <div className="Speed-Graph">
            <ReactFC {...chartConfigs} />
        </div>
    );
  };
  export default Graphs;
