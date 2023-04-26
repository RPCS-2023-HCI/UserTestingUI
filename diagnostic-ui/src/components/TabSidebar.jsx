import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import VehicleTabs from './VehicleTab/VehicleTabs';
import VehicleStatus from './VehicleSidebar/VehicleStatus';
import SimulationAnalysisPage from './FileTab/SimulationAnalysisPage';

import FolderIcon from '@mui/icons-material/Folder';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

function TabSidebar(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabSidebar.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ 
        flexGrow: 1, 
        bgcolor: 'background.paper', 
        display: 'flex',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical Tabs"
        sx={{ borderRight: 1, borderColor: 'divider', flexShrink: 0}}
      >
        <Tab icon={<DirectionsCarFilledIcon />} aria-label="car"{...a11yProps(0)} />
        <Tab icon={<FolderIcon />} aria-label="folder" {...a11yProps(1)} />

      </Tabs>

      <TabSidebar value={value} index={0}>
        <Stack direction="row">
          <Box 
          sx={{ width: '200px', flexShrink: 0 }}
          >
            <VehicleStatus/>
          </Box>
          <Box 
          sx={{ width: '85%', flexGrow: 1 }}
          >
            <VehicleTabs />
          </Box>
        </Stack>
      </TabSidebar>
      <TabSidebar value={value} index={1}>
        <Box sx={{ width: '100%' }}>
            <SimulationAnalysisPage />
        </Box>
      </TabSidebar>
    </Box>
  );
}