import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from '@mui/material';
import MonitorIcon from '@mui/icons-material/Monitor';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

interface Display {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  lastUpdated: string;
  isActive: boolean;
}

const DisplayDashboard: React.FC = () => {
  const [displays, setDisplays] = useState<Display[]>([
    {
      id: '1',
      name: 'Front Entrance Display',
      location: 'Main Entrance',
      status: 'online',
      lastUpdated: '2023-05-15T14:30:00',
      isActive: true
    },
    {
      id: '2',
      name: 'Bar Menu Display',
      location: 'Bar Area',
      status: 'online',
      lastUpdated: '2023-05-15T14:25:00',
      isActive: true
    },
    {
      id: '3',
      name: 'Drive-Thru Display',
      location: 'Drive-Thru',
      status: 'offline',
      lastUpdated: '2023-05-14T09:15:00',
      isActive: false
    }
  ]);

  const handleToggleActive = (id: string) => {
    setDisplays(displays.map(display => 
      display.id === id ? { ...display, isActive: !display.isActive } : display
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Display Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add New Display
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Active Displays
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {displays.map((display) => (
                <ListItem key={display.id} divider>
                  <ListItemIcon>
                    <MonitorIcon color={display.status === 'online' ? 'primary' : 'disabled'} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={display.name} 
                    secondary={`Location: ${display.location} | Last Updated: ${new Date(display.lastUpdated).toLocaleString()}`}
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={display.isActive} 
                            onChange={() => handleToggleActive(display.id)}
                            color="primary"
                          />
                        }
                        label={display.isActive ? 'Active' : 'Inactive'}
                        labelPlacement="start"
                      />
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<SettingsIcon />}
                        sx={{ ml: 1 }}
                      >
                        Configure
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<VisibilityIcon />}
                        sx={{ ml: 1 }}
                      >
                        Preview
                      </Button>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Display Status" />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Total Displays:</Typography>
                    <Typography variant="body1" fontWeight="bold">{displays.length}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Online:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                      {displays.filter(d => d.status === 'online').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Offline:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="error.main">
                      {displays.filter(d => d.status === 'offline').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">Active:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {displays.filter(d => d.isActive).length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Quick Actions" />
                <CardContent>
                  <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                    Refresh All Displays
                  </Button>
                  <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                    Update Content
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Display Settings
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DisplayDashboard;