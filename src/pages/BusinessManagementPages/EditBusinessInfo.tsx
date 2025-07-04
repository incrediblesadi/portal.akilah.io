import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Box,
  Alert,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface BusinessInfo {
  businessId: string;
  businessName: string;
  businessType: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessHours: {
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
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessId: '',
    businessName: '',
    businessType: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    businessHours: {
      monday: { open: '10:00', close: '22:00', isTwentyFourHours: false },
      tuesday: { open: '10:00', close: '22:00', isTwentyFourHours: false },
      wednesday: { open: '10:00', close: '22:00', isTwentyFourHours: false },
      thursday: { open: '10:00', close: '22:00', isTwentyFourHours: false },
      friday: { open: '10:00', close: '23:00', isTwentyFourHours: false },
      saturday: { open: '10:00', close: '23:00', isTwentyFourHours: false },
      sunday: { open: '11:00', close: '21:00', isTwentyFourHours: false }
    },
    features: {
      online_ordering_enabled: true,
      multi_language_enabled: false,
      auto_display_rotation: false,
      allow_specials: true
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchBusinessInfo = async () => {
      try {
        // Simulate API call - load existing data
        const mockData: BusinessInfo = {
          businessId: "business_001",
          businessName: "Sample Restaurant",
          businessType: "restaurant",
          description: "A sample restaurant for demonstration purposes",
          email: "contact@samplerestaurant.com",
          phone: "+1-555-123-4567",
          website: "https://samplerestaurant.com",
          address: {
            street: "123 Main Street",
            city: "Sample City",
            state: "SC",
            zipCode: "12345",
            country: "USA"
          },
          businessHours: {
            monday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
            tuesday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
            wednesday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
            thursday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
            friday: { open: "10:00", close: "23:00", isTwentyFourHours: false },
            saturday: { open: "10:00", close: "23:00", isTwentyFourHours: false },
            sunday: { open: "11:00", close: "21:00", isTwentyFourHours: false }
          },
          features: {
            online_ordering_enabled: true,
            multi_language_enabled: false,
            auto_display_rotation: false,
            allow_specials: true
          }
        };
        
        setBusinessInfo(mockData);
      } catch (error) {
        console.error('Error fetching business info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessInfo();
  }, []);

  const handleChange = (field: string, value: string | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBusinessInfo(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof BusinessInfo] as any),
          [child]: value
        }
      }));
    } else {
      setBusinessInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleHoursChange = (day: string, field: string, value: string | boolean) => {
    setBusinessInfo(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement actual save logic with API call
      console.log('Saving business info:', businessInfo);
      setSaveMessage('Business information updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
      
      // Optionally navigate back to view page
      // navigate('/business/view');
    } catch (error) {
      setSaveMessage('Error updating business information');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/business/view');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading business information...</Typography>
      </Container>
    );
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Business Information
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Update your business details below.
        </Typography>

        {saveMessage && (
          <Alert severity={saveMessage.includes('Error') ? 'error' : 'success'} sx={{ mb: 3 }}>
            {saveMessage}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Business Name"
              value={businessInfo.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Business Type"
              value={businessInfo.businessType}
              onChange={(e) => handleChange('businessType', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={businessInfo.description}
              onChange={(e) => handleChange('description', e.target.value)}
              multiline
              rows={3}
            />
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Contact Information</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={businessInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              value={businessInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Website"
              value={businessInfo.website}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </Grid>

          {/* Address Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Address Information</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Address"
              value={businessInfo.address.street}
              onChange={(e) => handleChange('address.street', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="City"
              value={businessInfo.address.city}
              onChange={(e) => handleChange('address.city', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="State"
              value={businessInfo.address.state}
              onChange={(e) => handleChange('address.state', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="ZIP Code"
              value={businessInfo.address.zipCode}
              onChange={(e) => handleChange('address.zipCode', e.target.value)}
              required
            />
          </Grid>

          {/* Business Hours */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Business Hours</Typography>
          </Grid>
          {days.map(day => (
            <Grid item xs={12} key={day}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ minWidth: 100, textTransform: 'capitalize' }}>
                  {day}:
                </Typography>
                <TextField
                  type="time"
                  label="Open"
                  value={businessInfo.businessHours[day]?.open || ''}
                  onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
                <TextField
                  type="time"
                  label="Close"
                  value={businessInfo.businessHours[day]?.close || ''}
                  onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Box>
            </Grid>
          ))}

          {/* Features */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Features</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={businessInfo.features.online_ordering_enabled}
                  onChange={(e) => handleChange('features.online_ordering_enabled', e.target.checked)}
                />
              }
              label="Online Ordering Enabled"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={businessInfo.features.multi_language_enabled}
                  onChange={(e) => handleChange('features.multi_language_enabled', e.target.checked)}
                />
              }
              label="Multi-Language Enabled"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={businessInfo.features.auto_display_rotation}
                  onChange={(e) => handleChange('features.auto_display_rotation', e.target.checked)}
                />
              }
              label="Auto Display Rotation"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={businessInfo.features.allow_specials}
                  onChange={(e) => handleChange('features.allow_specials', e.target.checked)}
                />
              }
              label="Allow Specials"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSaving}
            size="large"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditBusinessInfo;