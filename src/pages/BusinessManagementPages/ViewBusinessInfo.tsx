import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Container,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as WebsiteIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
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
  logo?: string;
  status: 'active' | 'inactive' | 'pending';
}

const ViewBusinessInfo: React.FC = () => {
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement business info load service
    const loadBusinessInfo = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockData: BusinessInfo = {
          name: 'Sample Restaurant',
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          phone: '(555) 123-4567',
          email: 'info@samplerestaurant.com',
          website: 'https://samplerestaurant.com',
          taxId: '12-3456789',
          description: 'A wonderful restaurant serving delicious food.',
          status: 'active',
        };
        
        setBusinessInfo(mockData);
      } catch (error) {
        console.error('Error loading business info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBusinessInfo();
  }, []);

  const handleEdit = () => {
    navigate('/business/edit');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Loading Business Information...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!businessInfo) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Business Information Not Found
          </Typography>
          <Button variant="contained" onClick={() => navigate('/business/setup')}>
            Setup Business
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Business Information
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Edit Information
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                  src={businessInfo.logo}
                >
                  {businessInfo.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {businessInfo.name}
                </Typography>
                <Chip
                  label={businessInfo.status.toUpperCase()}
                  color={getStatusColor(businessInfo.status) as any}
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {businessInfo.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Contact Information" />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LocationIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary={`${businessInfo.address}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zipCode}`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={businessInfo.phone}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={businessInfo.email}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <WebsiteIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Website"
                      secondary={businessInfo.website}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Tax ID"
                      secondary={businessInfo.taxId}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Business Details" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Business Hours
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Configure your business hours in the settings.
                      </Typography>
                      <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                        Configure Hours
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Location Settings
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Manage multiple locations and delivery areas.
                      </Typography>
                      <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                        Manage Locations
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ViewBusinessInfo;