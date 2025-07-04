import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  CircularProgress
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { loadBusinessInfo } from './BusinessManagementServices/businessmanagementload';
import { saveBusinessInfo } from './BusinessManagementServices/businessmanagementsave';

interface BusinessDisplayInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  taxId: string;
}

const BusinessDashboard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [businessInfo, setBusinessInfo] = useState<BusinessDisplayInfo>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    taxId: ''
  });

  useEffect(() => {
    loadBusinessData();
  }, []);

  const loadBusinessData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await loadBusinessInfo();
      
      // Transform the loaded data to match our display format
      setBusinessInfo({
        name: data.business_name || data.restaurant_name || '',
        address: data.address?.street || '',
        city: data.address?.city || '',
        state: data.address?.state || '',
        zipCode: data.address?.zip || '',
        phone: data.phone || '',
        email: data.email || '',
        website: data.website || '',
        taxId: '' // This would come from additional business data
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load business information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessInfo({
      ...businessInfo,
      [name]: value
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Transform the data back to the business info format
      const businessInfoToSave = {
        business_name: businessInfo.name,
        restaurant_name: businessInfo.name,
        address: {
          street: businessInfo.address,
          city: businessInfo.city,
          state: businessInfo.state,
          zip: businessInfo.zipCode
        },
        phone: businessInfo.phone,
        email: businessInfo.email,
        website: businessInfo.website,
        social_links: {},
        hours: {
          monday: { open: '09:00', close: '17:00', isTwentyFourHours: false },
          tuesday: { open: '09:00', close: '17:00', isTwentyFourHours: false },
          wednesday: { open: '09:00', close: '17:00', isTwentyFourHours: false },
          thursday: { open: '09:00', close: '17:00', isTwentyFourHours: false },
          friday: { open: '09:00', close: '17:00', isTwentyFourHours: false },
          saturday: { open: '09:00', close: '17:00', isTwentyFourHours: false },
          sunday: { open: '09:00', close: '17:00', isTwentyFourHours: false }
        },
        logo: '',
        about: '',
        features: {
          online_ordering_enabled: true,
          multi_language_enabled: false,
          auto_display_rotation: false,
          allow_specials: true
        }
      };
      
      await saveBusinessInfo(businessInfoToSave);
      setSuccess('Business information saved successfully');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save business information');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Business Management
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2">
                Business Information
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={isSaving}
              >
                {isSaving ? <CircularProgress size={20} /> : (isEditing ? 'Save' : 'Edit')}
              </Button>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            {isEditing ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    name="name"
                    value={businessInfo.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={businessInfo.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={businessInfo.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={businessInfo.state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="zipCode"
                    value={businessInfo.zipCode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={businessInfo.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={businessInfo.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    name="website"
                    value={businessInfo.website}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tax ID"
                    name="taxId"
                    value={businessInfo.taxId}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            ) : (
              <List>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Business Name" 
                    secondary={businessInfo.name || 'Not set'} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Address" 
                    secondary={businessInfo.address && businessInfo.city ? 
                      `${businessInfo.address}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zipCode}` : 
                      'Not set'
                    } 
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
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Website" 
                    secondary={businessInfo.website || 'Not set'} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Tax ID" 
                    secondary={businessInfo.taxId || 'Not set'} 
                  />
                </ListItem>
              </List>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Business Hours" />
                <CardContent>
                  <Typography variant="body1">
                    Configure your business hours in the settings page.
                  </Typography>
                  <Button variant="text" sx={{ mt: 1 }}>
                    Configure Hours
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Locations" />
                <CardContent>
                  <Typography variant="body1">
                    Manage multiple business locations.
                  </Typography>
                  <Button variant="text" sx={{ mt: 1 }}>
                    Manage Locations
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Business Settings" />
                <CardContent>
                  <Typography variant="body1">
                    Configure additional business settings.
                  </Typography>
                  <Button variant="text" sx={{ mt: 1 }}>
                    Business Settings
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

export default BusinessDashboard;