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
  Checkbox,
  FormControlLabel,
  Avatar,
  FormGroup,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'staff';
  permissions: {
    canEditBusiness: boolean;
    canManageMenu: boolean;
    canViewOrders: boolean;
    canManagePayments: boolean;
    canViewReports: boolean;
    canManageUsers: boolean;
  };
  profile: {
    avatar?: string;
    bio: string;
    department: string;
    startDate: string;
  };
}

const steps = [
  'Basic Information',
  'Role & Permissions',
  'Profile Details',
  'Review & Create'
];

const RegisterUser: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'staff',
    permissions: {
      canEditBusiness: false,
      canManageMenu: false,
      canViewOrders: true,
      canManagePayments: false,
      canViewReports: false,
      canManageUsers: false,
    },
    profile: {
      bio: '',
      department: '',
      startDate: new Date().toISOString().split('T')[0],
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileChange = (field: string, value: any) => {
    setUserInfo(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setUserInfo(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
      }
    }));
  };

  const handleRoleChange = (role: string) => {
    // Set default permissions based on role
    let defaultPermissions = {
      canEditBusiness: false,
      canManageMenu: false,
      canViewOrders: true,
      canManagePayments: false,
      canViewReports: false,
      canManageUsers: false,
    };

    switch (role) {
      case 'admin':
        defaultPermissions = {
          canEditBusiness: true,
          canManageMenu: true,
          canViewOrders: true,
          canManagePayments: true,
          canViewReports: true,
          canManageUsers: true,
        };
        break;
      case 'manager':
        defaultPermissions = {
          canEditBusiness: false,
          canManageMenu: true,
          canViewOrders: true,
          canManagePayments: true,
          canViewReports: true,
          canManageUsers: false,
        };
        break;
      case 'staff':
        defaultPermissions = {
          canEditBusiness: false,
          canManageMenu: false,
          canViewOrders: true,
          canManagePayments: false,
          canViewReports: false,
          canManageUsers: false,
        };
        break;
    }

    setUserInfo(prev => ({
      ...prev,
      role: role as any,
      permissions: defaultPermissions
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // TODO: Implement user creation service
    console.log('Creating user:', userInfo);
    navigate('/users/dashboard');
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleProfileChange('avatar', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={userInfo.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  label="Role"
                >
                  <MenuItem value="admin">Administrator</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="staff">Staff</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Permissions
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userInfo.permissions.canEditBusiness}
                      onChange={(e) => handlePermissionChange('canEditBusiness', e.target.checked)}
                    />
                  }
                  label="Can Edit Business Information"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userInfo.permissions.canManageMenu}
                      onChange={(e) => handlePermissionChange('canManageMenu', e.target.checked)}
                    />
                  }
                  label="Can Manage Menu"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userInfo.permissions.canViewOrders}
                      onChange={(e) => handlePermissionChange('canViewOrders', e.target.checked)}
                    />
                  }
                  label="Can View Orders"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userInfo.permissions.canManagePayments}
                      onChange={(e) => handlePermissionChange('canManagePayments', e.target.checked)}
                    />
                  }
                  label="Can Manage Payments"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userInfo.permissions.canViewReports}
                      onChange={(e) => handlePermissionChange('canViewReports', e.target.checked)}
                    />
                  }
                  label="Can View Reports"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userInfo.permissions.canManageUsers}
                      onChange={(e) => handlePermissionChange('canManageUsers', e.target.checked)}
                    />
                  }
                  label="Can Manage Users"
                />
              </FormGroup>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  src={userInfo.profile.avatar}
                >
                  {userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}
                </Avatar>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarUpload}
                />
                <label htmlFor="avatar-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Upload Photo
                  </Button>
                </label>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={3}
                    value={userInfo.profile.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    placeholder="Brief description about the user..."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={userInfo.profile.department}
                    onChange={(e) => handleProfileChange('department', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={userInfo.profile.startDate}
                    onChange={(e) => handleProfileChange('startDate', e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please review the user information before creating the account.
              </Alert>
              <Typography variant="h6" gutterBottom>
                User Summary
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</Typography>
                <Typography><strong>Email:</strong> {userInfo.email}</Typography>
                <Typography><strong>Phone:</strong> {userInfo.phone}</Typography>
                <Typography><strong>Role:</strong> {userInfo.role.toUpperCase()}</Typography>
                <Typography><strong>Department:</strong> {userInfo.profile.department}</Typography>
                <Typography><strong>Start Date:</strong> {new Date(userInfo.profile.startDate).toLocaleDateString()}</Typography>
                <Typography><strong>Permissions:</strong></Typography>
                <Box sx={{ ml: 2 }}>
                  {Object.entries(userInfo.permissions).map(([key, value]) => (
                    value && (
                      <Typography key={key} variant="body2">
                        • {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Typography>
                    )
                  ))}
                </Box>
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
          Register New User
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Add a new team member to your restaurant management portal.
        </Typography>

        <Card>
          <CardHeader title="User Registration" />
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
                  Create User
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

export default RegisterUser;