import React from 'react';
import { Row } from 'react-bootstrap';
import Typography from '@mui/material/Typography';

import "./CamRecording.css";

function CameraRecording() {

  return (
    <div className='video-recording'>
        <Row 
        // style={{width: '85vw', marginTop: '2.5vh'}}
        >
            <Typography variant="button" style={{fontSize: '1.2vw', color: '#1870d5'}}>
                Camera Recording
            </Typography>
        </Row>
        <Row className='video'>
            <iframe 
                src="https://groundsystemsoftware.s3.amazonaws.com/recordings/stream1_new.mp4" 
                title="AWS S3 video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        </Row>
    </div>
  )
}

export default CameraRecording;