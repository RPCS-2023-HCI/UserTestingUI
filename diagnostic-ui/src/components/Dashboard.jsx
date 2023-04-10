import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DiagnosticTabs from './DiagnosticTabs';

import { red } from '@mui/material/colors';

// Theme Changes Go Here - should apply to the entire dashboard
const mdTheme = createTheme( {
    palette: {
      primary: {
        main: red[500],
      }
    },
  }
);

function Dashboard() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MuiAppBar position="absolute">
          <Toolbar>
            <Box
              component="img"
              sx={{ width: 48, height: 48 }}
              src='/f1tenth-logo.png'
              alt="logo of F1 Tenth"
            />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Diagnostic Dashboard
            </Typography>
          </Toolbar>
        </MuiAppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <DiagnosticTabs/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;