import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BusinessInfo, loadBusinessInfo } from './BusinessManagementServices/businessmanagementload';
import { saveBusinessInfo } from './BusinessManagementServices/businessmanagementsave';

interface EditableBusinessInfo {
  business_name: string;
  restaurant_name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  website: string;
  about: string;
  social_links: {
    instagram: string;
    facebook: string;
    google: string;
  };
  hours: {
    [key: string]: {
      open: string;
      close: string;
      isTwentyFourHours: boolean;
    };
  };
  features: {
    online_ordering_enabled: boolean;
    multi_language_enabled: boolean;
    auto_display_rotation: boolean;
    allow_specials: boolean;
  };
}

const EditBusinessInfo: React.FC = () => {
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState<EditableBusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadBusinessInfo();
        setBusinessInfo({
          business_name: data.business_name,
          restaurant_name: data.restaurant_name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          website: data.website,
          about: data.about,
          social_links: {
            instagram: data.social_links.instagram || '',
            facebook: data.social_links.facebook || '',
            google: data.social_links.google || ''
          },
          hours: data.hours,
          features: data.features
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load business information');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (!businessInfo) return;

    const fieldParts = field.split('.');
    if (fieldParts.length === 1) {
      setBusinessInfo({
        ...businessInfo,
        [field]: value
      });
    } else if (fieldParts.length === 2) {
      const [parentField, childField] = fieldParts;
      setBusinessInfo({
        ...businessInfo,
        [parentField]: {
          ...(businessInfo[parentField as keyof EditableBusinessInfo] as any),
          [childField]: value
        }
      });
    }
  };

  const handleHourChange = (day: string, field: 'open' | 'close' | 'isTwentyFourHours', value: string | boolean) => {
    if (!businessInfo) return;

    setBusinessInfo({
      ...businessInfo,
      hours: {
        ...businessInfo.hours,
        [day]: {
          ...businessInfo.hours[day],
          [field]: value
        }
      }
    });
  };

  const handleSave = async () => {
    if (!businessInfo) return;

    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const businessData: BusinessInfo = {
        business_uid: '', // This would be set by the backend
        business_name: businessInfo.business_name,
        restaurant_name: businessInfo.restaurant_name,
        address: businessInfo.address,
        phone: businessInfo.phone,
        email: businessInfo.email,
        website: businessInfo.website,
        about: businessInfo.about,
        social_links: businessInfo.social_links,
        hours: businessInfo.hours,
        features: businessInfo.features,
        logo: '', // This would be handled separately
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await saveBusinessInfo(businessData);
      setSuccessMessage('Business information saved successfully!');
      
      // Redirect to view page after a short delay
      setTimeout(() => {
        navigate('/business/view');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to save business information');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/business/view');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !businessInfo) {
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
          Edit Business Information
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Basic Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business Name"
                  value={businessInfo.business_name}
                  onChange={(e) => handleInputChange('business_name', e.target.value)}
                  helperText="Legal name of your business entity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Restaurant Name"
                  value={businessInfo.restaurant_name}
                  onChange={(e) => handleInputChange('restaurant_name', e.target.value)}
                  helperText="Name displayed to customers"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={businessInfo.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  value={businessInfo.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  value={businessInfo.address.state}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  value={businessInfo.address.zip}
                  onChange={(e) => handleInputChange('address.zip', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={businessInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={businessInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website"
                  value={businessInfo.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourrestaurant.com"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="About"
                  value={businessInfo.about}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  helperText="Brief description of your restaurant"
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Business Hours */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Business Hours
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              {daysOfWeek.map((day) => (
                <Grid item xs={12} sm={6} key={day}>
                  <Card variant="outlined">
                    <CardHeader
                      title={day.charAt(0).toUpperCase() + day.slice(1)}
                      avatar={<AccessTimeIcon />}
                      titleTypographyProps={{ variant: 'subtitle1' }}
                    />
                    <CardContent>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={businessInfo.hours[day]?.isTwentyFourHours || false}
                            onChange={(e) => handleHourChange(day, 'isTwentyFourHours', e.target.checked)}
                          />
                        }
                        label="24 Hours"
                      />
                      {!businessInfo.hours[day]?.isTwentyFourHours && (
                        <Box sx={{ mt: 2 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                type="time"
                                label="Open"
                                value={businessInfo.hours[day]?.open || '09:00'}
                                onChange={(e) => handleHourChange(day, 'open', e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                type="time"
                                label="Close"
                                value={businessInfo.hours[day]?.close || '17:00'}
                                onChange={(e) => handleHourChange(day, 'close', e.target.value)}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Social Media Links */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Social Media Links
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Instagram URL"
                  value={businessInfo.social_links.instagram}
                  onChange={(e) => handleInputChange('social_links.instagram', e.target.value)}
                  placeholder="https://instagram.com/yourrestaurant"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Facebook URL"
                  value={businessInfo.social_links.facebook}
                  onChange={(e) => handleInputChange('social_links.facebook', e.target.value)}
                  placeholder="https://facebook.com/yourrestaurant"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Google Business URL"
                  value={businessInfo.social_links.google}
                  onChange={(e) => handleInputChange('social_links.google', e.target.value)}
                  placeholder="https://g.page/yourrestaurant"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Features Panel */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Business Features
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={businessInfo.features.online_ordering_enabled}
                    onChange={(e) => handleInputChange('features.online_ordering_enabled', e.target.checked)}
                  />
                }
                label="Online Ordering"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 3, mt: -1 }}>
                Allow customers to place orders online
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={businessInfo.features.multi_language_enabled}
                    onChange={(e) => handleInputChange('features.multi_language_enabled', e.target.checked)}
                  />
                }
                label="Multi-Language Support"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 3, mt: -1 }}>
                Display menus in multiple languages
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={businessInfo.features.auto_display_rotation}
                    onChange={(e) => handleInputChange('features.auto_display_rotation', e.target.checked)}
                  />
                }
                label="Auto Display Rotation"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 3, mt: -1 }}>
                Automatically rotate display content
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={businessInfo.features.allow_specials}
                    onChange={(e) => handleInputChange('features.allow_specials', e.target.checked)}
                  />
                }
                label="Daily Specials"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 3, mt: -1 }}>
                Enable daily specials management
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditBusinessInfo;