import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  Container,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface BusinessInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  taxId: string;
  description: string;
}

const steps = [
  'Basic Information',
  'Contact Details',
  'Business Details',
  'Review & Submit'
];

const SetupBusiness: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    taxId: '',
    description: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBusinessInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // TODO: Implement business info save service
    console.log('Saving business info:', businessInfo);
    navigate('/business/dashboard');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
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
                label="Business Description"
                name="description"
                multiline
                rows={4}
                value={businessInfo.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={businessInfo.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={businessInfo.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                label="State"
                name="state"
                value={businessInfo.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={businessInfo.zipCode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Phone"
                name="phone"
                value={businessInfo.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
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
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please review your business information before submitting.
              </Alert>
              <Typography variant="h6" gutterBottom>
                Business Information Summary
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography><strong>Name:</strong> {businessInfo.name}</Typography>
                <Typography><strong>Address:</strong> {businessInfo.address}, {businessInfo.city}, {businessInfo.state} {businessInfo.zipCode}</Typography>
                <Typography><strong>Phone:</strong> {businessInfo.phone}</Typography>
                <Typography><strong>Email:</strong> {businessInfo.email}</Typography>
                <Typography><strong>Website:</strong> {businessInfo.website}</Typography>
                <Typography><strong>Tax ID:</strong> {businessInfo.taxId}</Typography>
                <Typography><strong>Description:</strong> {businessInfo.description}</Typography>
              </Box>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Setup Business
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Complete the setup process to configure your business information.
        </Typography>

        <Card>
          <CardHeader title="Business Setup" />
          <CardContent>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" onClick={handleSubmit}>
                  Complete Setup
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SetupBusiness;