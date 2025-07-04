import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Box,
  Alert
} from '@mui/material';

interface BusinessInfo {
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
}

const SetupBusiness: React.FC = () => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    businessType: 'restaurant',
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
    }
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBusinessInfo(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof BusinessInfo] as Record<string, any>),
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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement actual save logic with API call
      console.log('Saving business info:', businessInfo);
      setSaveMessage('Business information saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving business information');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Setup Business Information
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please provide your business details to get started.
        </Typography>

        {saveMessage && (
          <Alert severity={saveMessage.includes('Error') ? 'error' : 'success'} sx={{ mb: 3 }}>
            {saveMessage}
          </Alert>
        )}

        <Grid container spacing={3}>
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
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Address Information
            </Typography>
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
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSaving}
            size="large"
          >
            {isSaving ? 'Saving...' : 'Save Business Information'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SetupBusiness;