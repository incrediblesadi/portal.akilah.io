import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WebIcon from '@mui/icons-material/Web';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import { BusinessInfo, loadBusinessInfo } from './BusinessManagementServices/businessmanagementload';

const ViewBusinessInfo: React.FC = () => {
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadBusinessInfo();
        setBusinessInfo(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load business information');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatHours = (hours: BusinessInfo['hours']) => {
    return Object.entries(hours).map(([day, time]) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      time: time.isTwentyFourHours ? '24 Hours' : `${time.open} - ${time.close}`
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!businessInfo) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          No business information found. Please set up your business first.
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/business/setup')}
          sx={{ mt: 2 }}
        >
          Setup Business
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Business Information
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate('/business/edit')}
        >
          Edit Business Info
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Business Information */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Basic Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Business Name" 
                  secondary={businessInfo.business_name}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Restaurant Name" 
                  secondary={businessInfo.restaurant_name}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Address" 
                  secondary={`${businessInfo.address.street}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Phone" 
                  secondary={businessInfo.phone || 'Not set'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={businessInfo.email || 'Not set'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Website" 
                  secondary={businessInfo.website || 'Not set'}
                />
              </ListItem>
            </List>
          </Paper>

          {/* Business Hours */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Business Hours
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              {formatHours(businessInfo.hours).map((day, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined">
                    <CardContent sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
                        <Typography variant="subtitle2" component="div">
                          {day.day}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {day.time}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* About Section */}
          {businessInfo.about && (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                About
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                {businessInfo.about}
              </Typography>
            </Paper>
          )}
        </Grid>

        {/* Side Panel */}
        <Grid item xs={12} md={4}>
          {/* Business Features */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Features
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip 
                label="Online Ordering" 
                color={businessInfo.features.online_ordering_enabled ? 'success' : 'default'}
                variant={businessInfo.features.online_ordering_enabled ? 'filled' : 'outlined'}
              />
              <Chip 
                label="Multi-Language" 
                color={businessInfo.features.multi_language_enabled ? 'success' : 'default'}
                variant={businessInfo.features.multi_language_enabled ? 'filled' : 'outlined'}
              />
              <Chip 
                label="Auto Display Rotation" 
                color={businessInfo.features.auto_display_rotation ? 'success' : 'default'}
                variant={businessInfo.features.auto_display_rotation ? 'filled' : 'outlined'}
              />
              <Chip 
                label="Daily Specials" 
                color={businessInfo.features.allow_specials ? 'success' : 'default'}
                variant={businessInfo.features.allow_specials ? 'filled' : 'outlined'}
              />
            </Box>
          </Paper>

          {/* Social Links */}
          {(businessInfo.social_links.instagram || businessInfo.social_links.facebook || businessInfo.social_links.google) && (
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Social Media
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {businessInfo.social_links.instagram && (
                  <Button 
                    variant="outlined" 
                    href={businessInfo.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </Button>
                )}
                {businessInfo.social_links.facebook && (
                  <Button 
                    variant="outlined" 
                    href={businessInfo.social_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </Button>
                )}
                {businessInfo.social_links.google && (
                  <Button 
                    variant="outlined" 
                    href={businessInfo.social_links.google}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Business
                  </Button>
                )}
              </Box>
            </Paper>
          )}

          {/* Quick Actions */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button 
                variant="outlined" 
                startIcon={<EditIcon />}
                onClick={() => navigate('/business/edit')}
              >
                Edit Business Info
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<SettingsIcon />}
                onClick={() => navigate('/business/settings')}
              >
                Business Settings
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<BusinessIcon />}
                onClick={() => navigate('/business/dashboard')}
              >
                Business Dashboard
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewBusinessInfo;