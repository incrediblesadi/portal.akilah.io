import { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditBusinessInfo = () => {
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Sample Restaurant',
    address: '123 Main St, City, State 12345',
    phone: '(555) 123-4567',
    email: 'info@samplerestaurant.com',
    hours: 'Mon-Fri 9AM-9PM, Sat-Sun 10AM-8PM',
    description: 'A family-friendly restaurant serving delicious food.'
  });

  const handleInputChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Updating business information:', businessInfo);
    // TODO: Implement actual save functionality
    alert('Business information updated successfully!');
    navigate('/business/view');
  };

  const handleCancel = () => {
    navigate('/business/view');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Business Information
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Update your restaurant's information.
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
              Update Business Information
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditBusinessInfo;