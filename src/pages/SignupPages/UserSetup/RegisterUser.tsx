import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Alert,
  Link,
  Stepper,
  Step,
  StepLabel,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Account Information', 'Business Details', 'Verification'];

const RegisterUser: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  const [userInfo, setUserInfo] = useState({
    // Step 1 - Account Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2 - Business Details
    businessName: '',
    businessType: 'restaurant',
    role: 'owner'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        if (!userInfo.firstName || !userInfo.lastName || !userInfo.email || !userInfo.phone) {
          setErrorMessage('Please fill in all required fields');
          return false;
        }
        if (!userInfo.password || userInfo.password.length < 6) {
          setErrorMessage('Password must be at least 6 characters');
          return false;
        }
        if (userInfo.password !== userInfo.confirmPassword) {
          setErrorMessage('Passwords do not match');
          return false;
        }
        break;
      case 1:
        if (!userInfo.businessName || !userInfo.businessType) {
          setErrorMessage('Please fill in business information');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setErrorMessage('');
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // TODO: Implement actual registration logic
      console.log('Registration attempt:', userInfo);
      
      // Simulate registration API call
      console.log('Registration successful');
      navigate('/signin');
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                value={userInfo.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={userInfo.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={userInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={userInfo.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={userInfo.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
                helperText="Minimum 6 characters"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={userInfo.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                required
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
                label="Business Name"
                value={userInfo.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Business Type"
                value={userInfo.businessType}
                onChange={(e) => handleChange('businessType', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Your Role"
                value={userInfo.role}
                onChange={(e) => handleChange('role', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Account Summary
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> {userInfo.email}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Business:</strong> {userInfo.businessName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please review your information and click Register to complete your account setup.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Set up your Business Portal account
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link
              href="#"
              onClick={() => navigate('/signin')}
              sx={{ cursor: 'pointer' }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterUser;