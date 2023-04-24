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
    this.drawAxis(ctx, canvasWidth, canvasHeight, 10);
  }
  
  drawAxis = (ctx, canvasWidth, canvasHeight, tickLength) => {
    const rectSize = 10;
  
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
  
    // X-Axis
    ctx.moveTo(0, canvasHeight);
    ctx.lineTo(canvasWidth, canvasHeight);
  
    // Y-Axis
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvasHeight);
  
    ctx.stroke();
  
    // X-Axis ticks
    for (let i = 0; i <= 7; i++) {
      ctx.moveTo(i * (canvasWidth / 7), canvasHeight);
      ctx.lineTo(i * (canvasWidth / 7), canvasHeight - tickLength);
    }
  
    // Y-Axis ticks
    for (let i = 0; i <= 7; i++) {
      ctx.moveTo(0, canvasHeight - i * (canvasHeight / 7));
      ctx.lineTo(tickLength, canvasHeight - i * (canvasHeight / 7));
    }
  
    ctx.stroke();
  
    // Draw squares at (0,0), (0,7), (7,0), and (7,7)
    ctx.fillStyle = 'grey';
    ctx.fillRect((0 * canvasWidth) / 7, canvasHeight - (0 * canvasHeight) / 7 - rectSize / 2, rectSize, rectSize);
    ctx.fillRect((0 * canvasWidth) / 7, canvasHeight - (7 * canvasHeight) / 7 - rectSize / 2, rectSize, rectSize);
    ctx.fillRect((7 * canvasWidth) / 7 - rectSize / 2, canvasHeight - (0 * canvasHeight) / 7 - rectSize / 2, rectSize, rectSize);
    ctx.fillRect((7 * canvasWidth) / 7 - rectSize / 2, canvasHeight - (7 * canvasHeight) / 7 - rectSize / 2, rectSize, rectSize);
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