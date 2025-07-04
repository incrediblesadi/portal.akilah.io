import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Switch,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import SaveIcon from '@mui/icons-material/Save';

interface BusinessSetupData {
  businessName: string;
  restaurantName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  about: string;
  onlineOrderingEnabled: boolean;
  multiLanguageEnabled: boolean;
  autoDisplayRotation: boolean;
  allowSpecials: boolean;
}

const SetupBusiness: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [businessData, setBusinessData] = useState<BusinessSetupData>({
    businessName: '',
    restaurantName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    about: '',
    onlineOrderingEnabled: true,
    multiLanguageEnabled: false,
    autoDisplayRotation: false,
    allowSpecials: true
  });

  const steps = ['Basic Information', 'Contact Details', 'Features & Settings'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setBusinessData({
      ...businessData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call a service to save the data
      // await businessManagementService.saveBusiness(businessData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/business/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save business information');
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return !!businessData.businessName && !!businessData.restaurantName;
      case 1:
        return !!businessData.address && !!businessData.city && !!businessData.state && !!businessData.zipCode;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Business Name"
                name="businessName"
                value={businessData.businessName}
                onChange={handleChange}
                helperText="Legal name of your business entity"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Restaurant Name"
                name="restaurantName"
                value={businessData.restaurantName}
                onChange={handleChange}
                helperText="Name displayed to customers"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="About"
                name="about"
                value={businessData.about}
                onChange={handleChange}
                helperText="Brief description of your restaurant"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Street Address"
                name="address"
                value={businessData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                label="City"
                name="city"
                value={businessData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                label="State"
                name="state"
                value={businessData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                label="Zip Code"
                name="zipCode"
                value={businessData.zipCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={businessData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={businessData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={businessData.website}
                onChange={handleChange}
                placeholder="https://yourrestaurant.com"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Business Features
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={businessData.onlineOrderingEnabled}
                    onChange={handleChange}
                    name="onlineOrderingEnabled"
                    color="primary"
                  />
                }
                label="Enable Online Ordering"
              />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 3, mb: 2 }}>
                Allow customers to place orders through your website and mobile app
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={businessData.multiLanguageEnabled}
                    onChange={handleChange}
                    name="multiLanguageEnabled"
                    color="primary"
                  />
                }
                label="Enable Multi-Language Support"
              />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 3, mb: 2 }}>
                Display menus and information in multiple languages
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={businessData.autoDisplayRotation}
                    onChange={handleChange}
                    name="autoDisplayRotation"
                    color="primary"
                  />
                }
                label="Enable Auto Display Rotation"
              />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 3, mb: 2 }}>
                Automatically rotate content on digital displays
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={businessData.allowSpecials}
                    onChange={handleChange}
                    name="allowSpecials"
                    color="primary"
                  />
                }
                label="Enable Daily Specials"
              />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 3, mb: 2 }}>
                Allow creation and management of daily special menu items
              </Typography>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BusinessIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Business Setup
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mb: 4 }}>
          {renderStepContent()}
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={isLoading ? <CircularProgress size={24} /> : <SaveIcon />}
                onClick={handleSubmit}
                disabled={isLoading || !validateStep()}
              >
                {isLoading ? 'Saving...' : 'Complete Setup'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!validateStep()}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SetupBusiness;