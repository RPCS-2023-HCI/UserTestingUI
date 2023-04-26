import * as React from 'react';
import Switch from '@mui/material/Switch';
import useWebSocket from 'react-use-websocket';
import wscfg from '../../WebSocketConfig';

const GROUND_ENV_CTL = 'esp32/obsub';

export default function SensorToggle(props){
  const [checked, setChecked] = React.useState(true);

  const { sendMessage, lastMessage, readyState } = useWebSocket(wscfg.WS_URL, {
    share: true
  });

    
      React.useEffect(() => {
    if (lastMessage !== null) {
      try {
        let msg = JSON.parse(lastMessage.data);
        if (msg.topic == GROUND_ENV_CTL) {
          setChecked((prev) => msg.data == "start" ? true : false);
        }
      } catch (e) {
        console.log("json parse error", e);
      }
    }
  }, [lastMessage, setChecked]);

    
  const handleChange = (event) => {
      let nval = event.target.value;
    setChecked((prev) => {
      sendMessage(JSON.stringify({topic: GROUND_ENV_CTL, data: nval ? "start" : "stop"}));
      return nval;
    });
  };

    
    return(
        <div className="SensorToggleLine" sx={{ display: 'inline' }}>
            <p>
                {props.label}
                <Switch checked={checked} onChange={handleChange} color="success" sx={{ float: 'right', margin: "-6px 15% 0 0"}}/>
            </p>
        </div>
    )
}
