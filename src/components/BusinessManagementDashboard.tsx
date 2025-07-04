import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import DevicesIcon from '@mui/icons-material/Devices';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const BusinessManagementDashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Business Management',
      description: 'Setup and manage your business information, hours, and contact details',
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      path: '/business/setup',
      color: '#1976d2'
    },
    {
      title: 'Menu Management',
      description: 'Create and manage your menu items, categories, and pricing',
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
      path: '/menu',
      color: '#2e7d32'
    },
    {
      title: 'Display Management',
      description: 'Configure digital menu displays and screens',
      icon: <DisplaySettingsIcon sx={{ fontSize: 40 }} />,
      path: '/display',
      color: '#ed6c02'
    },
    {
      title: 'Kiosk Management',
      description: 'Setup and manage self-service kiosks',
      icon: <DevicesIcon sx={{ fontSize: 40 }} />,
      path: '/kiosk',
      color: '#9c27b0'
    },
    {
      title: 'KDC Management',
      description: 'Configure kitchen display controllers and stations',
      icon: <KitchenIcon sx={{ fontSize: 40 }} />,
      path: '/kdc',
      color: '#d32f2f'
    },
    {
      title: 'Order Management',
      description: 'View and track customer orders',
      icon: <ReceiptIcon sx={{ fontSize: 40 }} />,
      path: '/orders',
      color: '#7b1fa2'
    },
    {
      title: 'Payment Management',
      description: 'Connect payment providers and manage transactions',
      icon: <PaymentIcon sx={{ fontSize: 40 }} />,
      path: '/payment',
      color: '#388e3c'
    },
    {
      title: 'Reports',
      description: 'Generate business reports and analytics',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      path: '/reports',
      color: '#f57c00'
    },
    {
      title: 'System Map',
      description: 'Visualize the complete application structure',
      icon: <AccountTreeIcon sx={{ fontSize: 40 }} />,
      path: '/repository-map',
      color: '#5d4037'
    }
  ];

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Business Management Portal
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your comprehensive solution for restaurant management
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {modules.map((module, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: module.color, mb: 2 }}>
                  {module.icon}
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {module.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {module.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate(module.path)}
                  sx={{ backgroundColor: module.color }}
                >
                  Open Module
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          🚀 Full Stack Business Management Portal - Ready for your AWS deployment
        </Typography>
      </Paper>
    </Box>
  );
};

export default BusinessManagementDashboard;