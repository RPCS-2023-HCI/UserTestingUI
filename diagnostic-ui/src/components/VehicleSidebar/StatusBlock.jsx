import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { pink } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontSize: 10,
  },
});

export default function StatusBlock(props){
    return(
      <ThemeProvider theme={theme}>
        <div className="oneStatusLine" sx={{ display: 'inline' }}>
          {props.label}
          {props.sensorOn === "true" ? (
            <CheckCircleIcon color="success" sx={{ float: 'right', margin: "0 15% 0 0" }} />
          ) : (
            <CancelIcon sx={{ color: pink[500], float: 'right', margin: "0 15% 0 0" }} />
          )}
        </div>
      </ThemeProvider>
    )
}