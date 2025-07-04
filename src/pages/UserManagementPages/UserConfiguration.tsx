import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveUserConfig } from './UserManagementServices/usermanagementdata';
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
  CardHeader,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Save,
  CheckCircle
} from '@mui/icons-material';

interface UserConfigData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessType: string;
  businessRole: string;
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

const UserConfiguration: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [configData, setConfigData] = useState<UserConfigData>({
    firstName: user?.attributes?.given_name || '',
    lastName: user?.attributes?.family_name || '',
    email: user?.attributes?.email || '',
    phone: user?.attributes?.phone_number || '',
    businessType: '',
    businessRole: 'owner',
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
  });

  const steps = ['Personal Information', 'Business Details', 'Security & Notifications'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setConfigData({
      ...configData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Save user configuration using the service
      await saveUserConfig(configData);
      
      setSuccess('User configuration completed successfully');
      
      // Redirect to business setup after successful configuration
      setTimeout(() => {
        navigate('/business/setup');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to save user configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return !!(configData.firstName && configData.lastName && configData.email);
      case 1:
        return !!(configData.businessType && configData.businessRole);
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="First Name"
                name="firstName"
                value={configData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Last Name"
                name="lastName"
                value={configData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Email Address"
                name="email"
                type="email"
                value={configData.email}
                onChange={handleChange}
                helperText="This will be your primary contact email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={configData.phone}
                onChange={handleChange}
                helperText="Optional: For SMS notifications and two-factor authentication"
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
                label="Business Type"
                name="businessType"
                value={configData.businessType}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                helperText="What type of business are you running?"
              >
                <option value="">Select Business Type</option>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Cafe</option>
                <option value="food_truck">Food Truck</option>
                <option value="bakery">Bakery</option>
                <option value="bar">Bar/Pub</option>
                <option value="catering">Catering</option>
                <option value="other">Other Food Service</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Your Role"
                name="businessRole"
                value={configData.businessRole}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                helperText="What is your role in this business?"
              >
                <option value="owner">Owner</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff Member</option>
                <option value="admin">Administrator</option>
              </TextField>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Security Settings" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configData.twoFactorEnabled}
                        onChange={handleChange}
                        name="twoFactorEnabled"
                      />
                    }
                    label="Enable Two-Factor Authentication"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Adds an extra layer of security to your account
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Notification Preferences" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configData.emailNotifications}
                        onChange={handleChange}
                        name="emailNotifications"
                      />
                    }
                    label="Email Notifications"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    Receive important updates via email
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configData.smsNotifications}
                        onChange={handleChange}
                        name="smsNotifications"
                        disabled={!configData.phone}
                      />
                    }
                    label="SMS Notifications"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    Receive alerts via text message {!configData.phone && '(requires phone number)'}
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configData.marketingEmails}
                        onChange={handleChange}
                        name="marketingEmails"
                      />
                    }
                    label="Marketing Emails"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Receive tips, updates, and promotional content
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Complete Your Profile
      </Typography>
      
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Let's set up your account to get the most out of the platform
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} icon={<CheckCircle />}>
          {success}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4 }}>
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
            variant="outlined"
          >
            Back
          </Button>
          
          <Box sx={{ flex: 1 }} />
          
          {activeStep === steps.length - 1 ? (
            <Button
              onClick={handleComplete}
              variant="contained"
              disabled={!validateStep() || isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : <Save />}
            >
              {isLoading ? 'Saving...' : 'Complete Setup'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={!validateStep()}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default UserConfiguration;