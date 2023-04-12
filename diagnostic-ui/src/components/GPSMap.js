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

  animatePoints = () => {
    const { currentIndex, points } = this.state;
    const ctx = this.mapRef.current.getContext('2d');
    const scale = 4000;
    const data = points[currentIndex].split(',');
    const lat = parseFloat(data[2]);
    const lng = parseFloat(data[4]);
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const x = (centerX + lng * scale) % ctx.canvas.width;
    const y = (centerY + lat * scale) % ctx.canvas.height;
    const rectSize = 10;
    const rectX = (centerX + lng * scale) % ctx.canvas.width;
    const rectY = (centerY + lat * scale) % ctx.canvas.height;
  
    // Draw rectangle
    ctx.fillStyle = 'green';
    ctx.fillRect(rectX - rectSize / 2, rectY - rectSize / 2, rectSize, rectSize);
  
    // Clear previous rectangle
    const prevData = points[Math.max(currentIndex - 1, 0)].split(',');
    const prevLat = parseFloat(prevData[2]);
    const prevLng = parseFloat(prevData[4]);
    const prevX = (centerX + prevLng * scale) % ctx.canvas.width;
    const prevY = (centerY + prevLat * scale) % ctx.canvas.height;
    ctx.clearRect(prevX - rectSize / 2, prevY - rectSize / 2, rectSize, rectSize);
  
    // Draw black lines
    if (currentIndex === 0) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  
    if (currentIndex < points.length - 1) {
      setTimeout(() => {
        this.setState({ currentIndex: currentIndex + 1 });
        if (this.props.isDrawing) {
          this.requestID = requestAnimationFrame(this.animatePoints);
        }
      }, 1000); // Change this value to adjust the delay between points
    }
  };

  plotGPSData() {
    this.setState({ points: this.props.data["Object"]["Item"]["gps"] });
  }

  render() {
    return <canvas ref={this.mapRef} width={400} height={400} />;
  }
}

export default GPSMap;