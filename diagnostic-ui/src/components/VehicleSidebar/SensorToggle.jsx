import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function SensorToggle(props){
    return(
        <div className="SensorToggleLine" sx={{ display: 'inline' }}>
            <p>
                {props.label}
                <Switch defaultChecked color="success" sx={{ float: 'right', margin: "-6px 15% 0 0"}}/>
            </p>
        </div>
    )
}