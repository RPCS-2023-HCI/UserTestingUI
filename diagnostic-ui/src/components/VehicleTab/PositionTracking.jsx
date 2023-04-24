import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import wscfg from '../../WebSocketConfig';
import {
    Dot,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceDot
  } from "recharts";

const GROUND_SYS_GPS_TOPIC = "groundsys/gps";

const RenderDot = ({ cx, cy }) => {
return (
    <Dot cx={cx} cy={cy} fill="red" r={15} />
);
};

function PositionTracking() {
    const [positionData, setPositionData] = useState([]);

    // websocket updates
    const { sendMessage, lastMessage, readyState } = useWebSocket(wscfg.WS_URL, {
        share: true
    });
  
    React.useEffect(() => {
        if (lastMessage !== null) {
            try {
                let msg = JSON.parse(lastMessage.data);
                if (msg.topic == GROUND_SYS_GPS_TOPIC) {
                  let data = JSON.parse(msg.data);
                  setPositionData((prev) => prev.append(data));
                }
            } catch (e) {}
        }
    }, [lastMessage, setPositionData]);
    
    return(
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }}
            >
                <CartesianGrid />
                <XAxis type="number" domain={[0, 8]} dataKey="x"  unit="m" />
                <YAxis type="number" domain={[0, 8]} dataKey="y" unit="m" />


                {/* <Tooltip cursor={{ strokeDasharray: "3 3" }} /> */}
                <ReferenceDot x={0} y={0} r={10} fill='black'/>
                <ReferenceDot x={0} y={7} r={10} fill='black'/>
                <ReferenceDot x={7} y={7} r={10} fill='black'/>
                <ReferenceDot x={7} y={0} r={10} fill='black'/>
                <Scatter name="car" data={positionData} shape={<RenderDot/>}/>
            </ScatterChart>
        </ResponsiveContainer>


    )

}

export default PositionTracking;
