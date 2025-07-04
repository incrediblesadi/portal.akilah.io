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
  ListItemSecondaryAction,
  Chip
} from '@mui/material';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

interface KDC {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  lastUpdated: string;
  isActive: boolean;
  orderCount: number;
  stationType: 'hot' | 'cold' | 'bar' | 'dessert';
}

const KDCDashboard: React.FC = () => {
  const [kdcs, setKdcs] = useState<KDC[]>([
    {
      id: '1',
      name: 'Main Kitchen KDC',
      location: 'Main Kitchen',
      status: 'online',
      lastUpdated: '2023-05-15T14:30:00',
      isActive: true,
      orderCount: 12,
      stationType: 'hot'
    },
    {
      id: '2',
      name: 'Bar KDC',
      location: 'Bar Area',
      status: 'online',
      lastUpdated: '2023-05-15T14:25:00',
      isActive: true,
      orderCount: 5,
      stationType: 'bar'
    },
    {
      id: '3',
      name: 'Cold Station KDC',
      location: 'Prep Area',
      status: 'offline',
      lastUpdated: '2023-05-14T09:15:00',
      isActive: false,
      orderCount: 0,
      stationType: 'cold'
    }
  ]);

  const handleToggleActive = (id: string) => {
    setKdcs(kdcs.map(kdc => 
      kdc.id === id ? { ...kdc, isActive: !kdc.isActive } : kdc
    ));
  };

  const getStationTypeColor = (type: string) => {
    switch(type) {
      case 'hot': return 'error';
      case 'cold': return 'info';
      case 'bar': return 'warning';
      case 'dessert': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Kitchen Display Controller Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add New KDC
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Active Kitchen Displays
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {kdcs.map((kdc) => (
                <ListItem key={kdc.id} divider>
                  <ListItemIcon>
                    <KitchenIcon color={kdc.status === 'online' ? 'primary' : 'disabled'} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {kdc.name}
                        <Chip 
                          label={kdc.stationType.toUpperCase()} 
                          size="small" 
                          color={getStationTypeColor(kdc.stationType) as any}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    } 
                    secondary={`Location: ${kdc.location} | Orders: ${kdc.orderCount} | Last Updated: ${new Date(kdc.lastUpdated).toLocaleString()}`}
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={kdc.isActive} 
                            onChange={() => handleToggleActive(kdc.id)}
                            color="primary"
                          />
                        }
                        label={kdc.isActive ? 'Active' : 'Inactive'}
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
                        View
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
                <CardHeader title="KDC Status" />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Total KDCs:</Typography>
                    <Typography variant="body1" fontWeight="bold">{kdcs.length}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Online:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                      {kdcs.filter(d => d.status === 'online').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Offline:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="error.main">
                      {kdcs.filter(d => d.status === 'offline').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Active:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {kdcs.filter(d => d.isActive).length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">Total Orders:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {kdcs.reduce((sum, kdc) => sum + kdc.orderCount, 0)}
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
                    Refresh All KDCs
                  </Button>
                  <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                    Update Routing
                  </Button>
                  <Button variant="outlined" fullWidth>
                    KDC Settings
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

export default KDCDashboard;