import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// TABS
import VehicleSubTab from './VehicleSubTab';
import EnvSubTab from './EnvSubTab';
import ConsoleSubTab from './ConsoleSubTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: 2}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function VehicleTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100%" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Vehicle" {...a11yProps(0)} />
          <Tab label="Environment" {...a11yProps(1)} />
          <Tab label="Console Log" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <VehicleSubTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EnvSubTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ConsoleSubTab/>
      </TabPanel>
    </Box>
  );
}