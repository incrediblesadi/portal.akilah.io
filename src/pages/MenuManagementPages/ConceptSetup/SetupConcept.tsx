import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Container,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ConceptInfo {
  id: string;
  name: string;
  description: string;
  type: 'full-service' | 'quick-service' | 'fast-casual' | 'fine-dining';
  active: boolean;
  categories: string[];
  settings: {
    allowCustomizations: boolean;
    allowSpecialInstructions: boolean;
    preparationTime: number;
    taxRate: number;
  };
}

const steps = [
  'Basic Information',
  'Concept Type',
  'Settings',
  'Review & Create'
];

const SetupConcept: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [conceptInfo, setConceptInfo] = useState<ConceptInfo>({
    id: '',
    name: '',
    description: '',
    type: 'full-service',
    active: true,
    categories: [],
    settings: {
      allowCustomizations: true,
      allowSpecialInstructions: true,
      preparationTime: 15,
      taxRate: 8.25,
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConceptInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingChange = (field: string, value: any) => {
    setConceptInfo(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // TODO: Implement concept creation service
    console.log('Creating concept:', conceptInfo);
    navigate('/menu/dashboard');
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
                label="Concept Name"
                name="name"
                value={conceptInfo.name}
                onChange={handleChange}
                placeholder="e.g., Main Dining, Quick Service"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={conceptInfo.description}
                onChange={handleChange}
                placeholder="Describe your concept..."
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Concept Type</InputLabel>
                <Select
                  name="type"
                  value={conceptInfo.type}
                  onChange={(e) => setConceptInfo(prev => ({ ...prev, type: e.target.value as any }))}
                  label="Concept Type"
                >
                  <MenuItem value="full-service">Full Service</MenuItem>
                  <MenuItem value="quick-service">Quick Service</MenuItem>
                  <MenuItem value="fast-casual">Fast Casual</MenuItem>
                  <MenuItem value="fine-dining">Fine Dining</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Concept Type Details
              </Typography>
              <Box sx={{ mt: 2 }}>
                {conceptInfo.type === 'full-service' && (
                  <Alert severity="info">
                    Full service restaurants with table service and comprehensive menu options.
                  </Alert>
                )}
                {conceptInfo.type === 'quick-service' && (
                  <Alert severity="info">
                    Fast food restaurants with counter service and limited menu.
                  </Alert>
                )}
                {conceptInfo.type === 'fast-casual' && (
                  <Alert severity="info">
                    Higher quality quick service with customizable options.
                  </Alert>
                )}
                {conceptInfo.type === 'fine-dining' && (
                  <Alert severity="info">
                    Upscale dining experience with premium ingredients and service.
                  </Alert>
                )}
              </Box>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Average Preparation Time (minutes)"
                type="number"
                value={conceptInfo.settings.preparationTime}
                onChange={(e) => handleSettingChange('preparationTime', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tax Rate (%)"
                type="number"
                step="0.01"
                value={conceptInfo.settings.taxRate}
                onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Concept Settings
              </Typography>
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Allow Customizations</InputLabel>
                  <Select
                    value={conceptInfo.settings.allowCustomizations}
                    onChange={(e) => handleSettingChange('allowCustomizations', e.target.value)}
                    label="Allow Customizations"
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Allow Special Instructions</InputLabel>
                  <Select
                    value={conceptInfo.settings.allowSpecialInstructions}
                    onChange={(e) => handleSettingChange('allowSpecialInstructions', e.target.value)}
                    label="Allow Special Instructions"
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please review your concept information before creating.
              </Alert>
              <Typography variant="h6" gutterBottom>
                Concept Summary
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography><strong>Name:</strong> {conceptInfo.name}</Typography>
                <Typography><strong>Description:</strong> {conceptInfo.description}</Typography>
                <Typography><strong>Type:</strong> {conceptInfo.type.replace('-', ' ').toUpperCase()}</Typography>
                <Typography><strong>Preparation Time:</strong> {conceptInfo.settings.preparationTime} minutes</Typography>
                <Typography><strong>Tax Rate:</strong> {conceptInfo.settings.taxRate}%</Typography>
                <Typography><strong>Customizations:</strong> {conceptInfo.settings.allowCustomizations ? 'Allowed' : 'Not Allowed'}</Typography>
                <Typography><strong>Special Instructions:</strong> {conceptInfo.settings.allowSpecialInstructions ? 'Allowed' : 'Not Allowed'}</Typography>
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
          Setup New Concept
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Create a new dining concept for your restaurant.
        </Typography>

        <Card>
          <CardHeader title="Concept Setup" />
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
                  Create Concept
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

export default SetupConcept;