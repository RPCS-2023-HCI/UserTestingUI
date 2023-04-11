import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export const toolbarListItems = (
  <React.Fragment>
    <ListItemButton href='/past-test'>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary="Past Tests" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DirectionsCarIcon />
      </ListItemIcon>
      <ListItemText primary="Vehicle" />
    </ListItemButton>
  </React.Fragment>
);