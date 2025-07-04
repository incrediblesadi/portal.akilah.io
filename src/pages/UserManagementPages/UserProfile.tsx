import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Email,
  Phone,
  Security,
  Edit,
  Save,
  Delete,
  Warning
} from '@mui/icons-material';

interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const [profileData, setProfileData] = useState<UserProfileData>({
    firstName: user?.attributes?.given_name || 'John',
    lastName: user?.attributes?.family_name || 'Doe',
    email: user?.attributes?.email || 'john.doe@example.com',
    phone: user?.attributes?.phone_number || '+1234567890',
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // In a real implementation, this would call the API to update user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the API to delete the user account
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sign out the user after account deletion
      await signOut();
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2">
                Personal Information
              </Typography>
              <Button
                variant="outlined"
                startIcon={isEditing ? <Save /> : <Edit />}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={20} /> : (isEditing ? 'Save' : 'Edit')}
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80, mr: 2, bgcolor: 'primary.main' }}>
                {getInitials(profileData.firstName, profileData.lastName)}
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {profileData.firstName} {profileData.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profileData.email}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'standard'}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'standard'}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'standard'}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'standard'}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Security Settings" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Security />
                      </ListItemIcon>
                      <ListItemText primary="Two-Factor Authentication" />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.twoFactorEnabled}
                            onChange={handleChange}
                            name="twoFactorEnabled"
                            disabled={!isEditing}
                          />
                        }
                        label=""
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="Notification Settings" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText primary="Email Notifications" />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.emailNotifications}
                            onChange={handleChange}
                            name="emailNotifications"
                            disabled={!isEditing}
                          />
                        }
                        label=""
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText primary="SMS Notifications" />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.smsNotifications}
                            onChange={handleChange}
                            name="smsNotifications"
                            disabled={!isEditing}
                          />
                        }
                        label=""
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="Account Actions" />
                <CardContent>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => setDeleteDialogOpen(true)}
                    fullWidth
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Warning sx={{ mr: 1, color: 'error.main' }} />
            Delete Account
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
            All your data will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} /> : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;