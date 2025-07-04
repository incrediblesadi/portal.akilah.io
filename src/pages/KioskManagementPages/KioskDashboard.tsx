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
import TabletMacIcon from '@mui/icons-material/TabletMac';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface Kiosk {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdated: string;
  isActive: boolean;
  orderCount: number;
  revenue: number;
}

const KioskDashboard: React.FC = () => {
  const [kiosks, setKiosks] = useState<Kiosk[]>([
    {
      id: '1',
      name: 'Front Entrance Kiosk 1',
      location: 'Main Entrance',
      status: 'online',
      lastUpdated: '2023-05-15T14:30:00',
      isActive: true,
      orderCount: 45,
      revenue: 1250.75
    },
    {
      id: '2',
      name: 'Front Entrance Kiosk 2',
      location: 'Main Entrance',
      status: 'online',
      lastUpdated: '2023-05-15T14:25:00',
      isActive: true,
      orderCount: 38,
      revenue: 987.50
    },
    {
      id: '3',
      name: 'Drive-Thru Kiosk',
      location: 'Drive-Thru',
      status: 'maintenance',
      lastUpdated: '2023-05-14T09:15:00',
      isActive: false,
      orderCount: 0,
      revenue: 0
    }
  ]);

  const handleToggleActive = (id: string) => {
    setKiosks(kiosks.map(kiosk => 
      kiosk.id === id ? { ...kiosk, isActive: !kiosk.isActive } : kiosk
    ));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'success';
      case 'offline': return 'error';
      case 'maintenance': return 'warning';
      default: return 'default';
    }
  };

  const totalRevenue = kiosks.reduce((sum, kiosk) => sum + kiosk.revenue, 0);
  const totalOrders = kiosks.reduce((sum, kiosk) => sum + kiosk.orderCount, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Kiosk Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add New Kiosk
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Self-Service Kiosks
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {kiosks.map((kiosk) => (
                <ListItem key={kiosk.id} divider>
                  <ListItemIcon>
                    <TabletMacIcon color={kiosk.status === 'online' ? 'primary' : 'disabled'} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {kiosk.name}
                        <Chip 
                          label={kiosk.status.toUpperCase()} 
                          size="small" 
                          color={getStatusColor(kiosk.status) as any}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    } 
                    secondary={
                      <Box>
                        <Typography variant="body2">Location: {kiosk.location}</Typography>
                        <Typography variant="body2">
                          Orders: {kiosk.orderCount} | Revenue: ${kiosk.revenue.toFixed(2)} | 
                          Last Updated: {new Date(kiosk.lastUpdated).toLocaleString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={kiosk.isActive} 
                            onChange={() => handleToggleActive(kiosk.id)}
                            color="primary"
                          />
                        }
                        label={kiosk.isActive ? 'Active' : 'Inactive'}
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
                <CardHeader 
                  title="Kiosk Performance" 
                  avatar={<AttachMoneyIcon color="primary" />}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Total Revenue:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                      ${totalRevenue.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Total Orders:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {totalOrders}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Average Order Value:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Kiosk Status" />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Total Kiosks:</Typography>
                    <Typography variant="body1" fontWeight="bold">{kiosks.length}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Online:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                      {kiosks.filter(k => k.status === 'online').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Offline:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="error.main">
                      {kiosks.filter(k => k.status === 'offline').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Maintenance:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="warning.main">
                      {kiosks.filter(k => k.status === 'maintenance').length}
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
                    Refresh All Kiosks
                  </Button>
                  <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                    Update Content
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Kiosk Settings
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

export default KioskDashboard;