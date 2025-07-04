import { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid } from '@mui/material';

const SetupBusiness = () => {
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving business information:', businessInfo);
    // TODO: Implement actual save functionality
    alert('Business information saved successfully!');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Setup Business Information
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Enter your restaurant's basic information to get started.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Business Name"
            value={businessInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            value={businessInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            value={businessInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Business Hours"
            value={businessInfo.hours}
            onChange={(e) => handleInputChange('hours', e.target.value)}
            variant="outlined"
            placeholder="e.g., Mon-Fri 9AM-9PM"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={businessInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={businessInfo.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="contained" onClick={handleSave}>
              Save Business Information
            </Button>
            <Button variant="outlined">
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SetupBusiness;