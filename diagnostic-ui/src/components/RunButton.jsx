import React from 'react';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DangerousIcon from '@mui/icons-material/Dangerous';

// import './StartStopButton.css';

/* 
 * Toggles the car to start and stop running.
 */

function RunButton({ toggleDrive }) {
  const [isDriving, setIsDriving] = React.useState(true);
  const toggleDriving = () => {
    setIsDriving((prev) => !prev);
  };

  return ( 
    <Button variant="contained"
      sx={{
        display: 'flex',
        // alignItems: 'space-around',
        width: '150px'
      }} 
      onClick={toggleDriving}
    >
      {isDriving ?
        <div>
          <p>Start</p>
          <PlayArrowIcon
          sx={{
            fontSize: 25,
            padding: '0px'
          }}
        />
        </div> :
        <div style={{ color: 'secondary'}}>
          <p>Stop</p>
          <DangerousIcon
            sx={{
              fontSize: 25,
              padding: '0px'
          }}
        />
        </div>}
    </Button>
  );
}

export default RunButton;