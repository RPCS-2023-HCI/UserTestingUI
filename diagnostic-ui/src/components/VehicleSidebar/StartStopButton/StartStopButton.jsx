import React, { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DangerousIcon from '@mui/icons-material/Dangerous';
import useWebSocket from 'react-use-websocket';
import wscfg from '../../../WebSocketConfig';

// import './StartStopButton.css';

/* 
 * Toggles the car to start and stop running.
 */

const START_STOP_CTL_TOPIC = 'hci/startstop_ctl';

function StartStopButton({ toggleDrive }) {
  const [isDriving, setIsDriving] = React.useState(true);

  const { sendMessage, lastMessage, readyState } = useWebSocket(wscfg.WS_URL, {
    share: true,
    onOpen: () => {
      console.log('WebSocket connection established (start/stop).');
    }
  });

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        let msg = JSON.parse(lastMessage.data);
        if (msg.topic == START_STOP_CTL_TOPIC) {
          setIsDriving((prev) => JSON.parse(msg.data));
        }
      } catch (e) {
        console.log("json parse error", e);
      }
    }
  }, [lastMessage, setIsDriving]);

  const toggleDriving = () => {
    setIsDriving((prev) => {
      sendMessage(JSON.stringify({topic: START_STOP_CTL_TOPIC, data: JSON.stringify(!prev)}));
      return !prev;
    });
  };

  return ( 
    <Button 
      variant="contained" 
      fullWidth={true}
      sx={{padding: "5px"}}
      onClick={toggleDriving}
    >
      {isDriving ?
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
        >
          <p>Start</p>
          <PlayArrowIcon
          sx={{
            fontSize: 25,
            padding: '0px'
          }}
        />
        </Box> :
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
        >
          <p>Stop</p>
          <DangerousIcon
            sx={{
              fontSize: 25,
              padding: '0px'
          }}
        />
        </Box>}
    </Button>
  );
}

export default StartStopButton;
