import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BasicTextFields() {
    return (
        <Stack direction="row" spacing={2}>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <Button variant="contained" sx={{ float: 'right', margin: "0 15% 0 0"}}>Save</Button>
        </Stack>
      
    );
  }