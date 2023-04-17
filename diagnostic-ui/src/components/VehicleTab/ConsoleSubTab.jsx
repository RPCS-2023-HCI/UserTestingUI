import * as React from 'react';
import Grid from '@mui/material/Grid';
import ConsoleLog from '../ConsoleLog/ConsoleLog';

function ConsoleSubTab() {

  return ( 
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <ConsoleLog/>
      </Grid>
    </Grid>
  );
}

export default ConsoleSubTab;