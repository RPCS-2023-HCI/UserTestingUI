import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { pink } from '@mui/material/colors';


export default function StatusBlock(props){
    return(
        <div className="oneStatusLine" sx={{ display: 'inline' }}>
            <p>
                {props.label}
                {props.sensorOn === "true" ? (
                    <CheckCircleIcon color="success" sx={{ float: 'right', margin: "0 15% 0 0"}}/>
                ) : (
                    <CancelIcon sx={{ color: pink[500], float: 'right', margin: "0 15% 0 0"}}/>
                )}
            </p>
        </div>
    )
}