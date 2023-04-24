import React, { useState } from 'react';
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


const RenderDot = ({ cx, cy }) => {
return (
    <Dot cx={cx} cy={cy} fill="red" r={15} />
);
};

function PositionTracking() {
    const [positionX, setPositionX] = useState(3);
    const [positionY, setPositionY] = useState(1);
    let positionData = [{x: positionX, y: positionY}]; //must be in a list format

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
