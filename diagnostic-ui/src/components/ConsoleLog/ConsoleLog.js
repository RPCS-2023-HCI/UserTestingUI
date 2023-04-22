import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import wscfg from '../../WebSocketConfig';

function ConsoleLog() {
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(wscfg.WS_URL, {
    share: true,
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

  useEffect(() => {
    if (lastMessage !== null) {
      //setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  return (
    <div>
      <h2>Recent messages</h2>
      <ul>
        {messageHistory.map((message, idx) => (
          <li key={idx}>{message ? message.data : null}</li>
        ))}
      </ul>
    </div>
  );
}

export default ConsoleLog;
