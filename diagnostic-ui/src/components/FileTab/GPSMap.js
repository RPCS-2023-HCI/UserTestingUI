import React, { Component } from 'react';

class GPSMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      points: [],
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.plotGPSData();
    if (this.props.isDrawing) {
      this.drawStaticAxis();
      requestAnimationFrame(this.animatePoints);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isDrawing !== this.props.isDrawing) {
      if (this.props.isDrawing) {
        requestAnimationFrame(this.animatePoints);
      } else {
        cancelAnimationFrame(this.requestID);
      }
    }
  }

  drawStaticAxis() {
    const ctx = this.mapRef.current.getContext('2d');
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const margin = 20;
    this.drawAxis(ctx, canvasWidth, canvasHeight, 10, margin);
  }
  
  drawAxis = (ctx, canvasWidth, canvasHeight, tickLength, margin) => {
    const rectSize = 15;

    const startX = margin;
    const startY = canvasHeight - margin;
    const endX = canvasWidth - margin;
    const endY = margin;

    ctx.beginPath();
    ctx.strokeStyle = 'darkgrey';
    ctx.lineWidth = 1;

    // X-Axis
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, startY);

    // Y-Axis
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, endY);

    ctx.stroke();

    const numOfTicks = 7;
    const xTickInterval = (endX - startX) / numOfTicks;
    const yTickInterval = (startY - endY) / numOfTicks;
    
    // X-Axis ticks
    for (let i = 0; i <= numOfTicks; i++) {
      ctx.moveTo(startX + i * xTickInterval, startY);
      ctx.lineTo(startX + i * xTickInterval, startY - tickLength);
    }
  
    // Y-Axis ticks
    for (let i = 0; i <= numOfTicks; i++) {
      ctx.moveTo(startX, startY - i * yTickInterval);
      ctx.lineTo(startX + tickLength, startY - i * yTickInterval);
    }
  
    ctx.stroke();
  
    // Draw squares at (0,0), (0,7), (7,0), and (7,7)
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('(0, 0)', startX + 8, startY - 14);
    ctx.fillText('(0, 7)', startX + 18, endY - 2);
    ctx.fillText('(7, 0)', endX - 24, startY - 14);
    ctx.fillText('(7, 7)', endX - 40, endY - 2);
    ctx.fillStyle = 'grey';
    ctx.fillRect(startX, startY - rectSize / 2, rectSize, rectSize);
    ctx.fillRect(startX, endY - rectSize / 2, rectSize, rectSize);
    ctx.fillRect(endX - rectSize / 2, startY - rectSize / 2, rectSize, rectSize);
    ctx.fillRect(endX - rectSize / 2, endY - rectSize / 2, rectSize, rectSize);
  };

  animatePoints = () => {
    if (!this.mapRef.current) {
      this.requestID = requestAnimationFrame(this.animatePoints);
      return;
    }

    const { currentIndex, points } = this.state;
    const ctx = this.mapRef.current.getContext('2d');

    const [minX, maxX] = [Math.min(...points.map(point => point.X)), Math.max(...points.map(point => point.X))];
    const [minY, maxY] = [Math.min(...points.map(point => point.Y)), Math.max(...points.map(point => point.Y))];
  
    const xRange = maxX - minX;
    const yRange = maxY - minY;

    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    const scaleX = (canvasWidth - 50) / xRange; // leave some margin
    const scaleY = (canvasHeight - 50) / yRange; // leave some margin
    const scale = Math.min(scaleX, scaleY);

    const xCenter = (minX + maxX) / 2;
    const yCenter = (minY + maxY) / 2;

    const x = points[currentIndex].X;
    const y = points[currentIndex].Y;

    const xOffset = canvasWidth / 2 - xCenter * scale;
    const yOffset = canvasHeight / 2 - yCenter * scale;

    const rectSize = 10;
    const rectX = x * scale + xOffset;
    const rectY = y * scale + yOffset;

    if (currentIndex > 0) {
      const prevX = points[currentIndex - 1].X;
      const prevY = points[currentIndex - 1].Y;
      const prevRectX = prevX * scale + xOffset;
      const prevRectY = prevY * scale + yOffset;
      ctx.clearRect(prevRectX - rectSize / 2, prevRectY - rectSize / 2, rectSize, rectSize);
    }

    ctx.fillStyle = 'steelblue';
    ctx.fillRect(rectX - rectSize / 2, rectY - rectSize / 2, rectSize, rectSize);

    if (currentIndex === 0) {
      this.drawStaticAxis();
      ctx.beginPath();
      ctx.moveTo(rectX, rectY);
    } else {
      ctx.lineTo(rectX, rectY);
      ctx.stroke();
    }

    if (currentIndex < points.length - 1) {
      setTimeout(() => {
        this.setState({ currentIndex: currentIndex + 1 });
        if (this.props.isDrawing) {
          this.requestID = requestAnimationFrame(this.animatePoints);
        }
      }, 500); // Change this value to adjust the delay between points
    }
  };

  plotGPSData() {
    this.setState({ points: this.props.data["Position"]["value"] });
  }

  render() {
    return <canvas ref={this.mapRef} width={400} height={400} />;
  }
}

export default GPSMap;