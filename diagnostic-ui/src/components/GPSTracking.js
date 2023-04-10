import React, { Component } from 'react';

class GPSMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      points: [],
      currentIndex: 0,
      isDrawing: true,
    };
  }

  componentDidMount() {
    this.plotGPSData();
    setTimeout(() => {
      requestAnimationFrame(this.animatePoints);
    }, 500);
  }

  componentWillUnmount() {
    this.setState({ isDrawing: false });
  }

  animatePoints = () => {
    const { currentIndex, points } = this.state;
    const ctx = this.mapRef.current.getContext('2d');
    const scale = 5000;
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
      this.setState({ currentIndex: currentIndex + 1 });
      setTimeout(() => {
        requestAnimationFrame(this.animatePoints);
      }, 500);
    }
  };
  
  fetchGPSData() {
    const SERVER = 'https://fwo91hdzog.execute-api.us-east-1.amazonaws.com/test/dynamodbmanager';

    const payload = {
        "Key": {
            "id": this.props.simID
        },
      }
      const data = {
        "operation": "read",
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
            // console.log('Success:', data);
            this.setState({ points: data["Object"]["Item"]["gps"] });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
  }

  plotGPSData() {
    this.fetchGPSData();
  }

  render() {
    return <canvas ref={this.mapRef} width={800} height={800} />;
  }
}

export default GPSMap;