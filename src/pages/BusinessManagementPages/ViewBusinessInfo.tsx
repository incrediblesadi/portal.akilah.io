import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button
} from '@mui/material';
import { Edit, Business, Email, Phone, Public, LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface BusinessInfo {
  businessId: string;
  businessName: string;
  businessType: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessHours: {
    [key: string]: {
      open: string;
      close: string;
      isTwentyFourHours: boolean;
    };
  };
  features: {
    online_ordering_enabled: boolean;
    multi_language_enabled: boolean;
    auto_display_rotation: boolean;
    allow_specials: boolean;
  };
  created_at: string;
  updated_at: string;
}

const ViewBusinessInfo: React.FC = () => {
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchBusinessInfo = async () => {
      try {
        // Simulate API call
        const mockData: BusinessInfo = {
          businessId: "business_001",
          businessName: "Sample Restaurant",
          businessType: "restaurant",
          description: "A sample restaurant for demonstration purposes",
          email: "contact@samplerestaurant.com",
          phone: "+1-555-123-4567",
          website: "https://samplerestaurant.com",
          address: {
            street: "123 Main Street",
            city: "Sample City",
            state: "SC",
            zipCode: "12345",
            country: "USA"
          },
          businessHours: {
            monday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
            tuesday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
            wednesday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
            thursday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
            friday: { open: "10:00", close: "23:00", isTwentyFourHours: false },
            saturday: { open: "10:00", close: "23:00", isTwentyFourHours: false },
            sunday: { open: "11:00", close: "21:00", isTwentyFourHours: false }
          },
          features: {
            online_ordering_enabled: true,
            multi_language_enabled: false,
            auto_display_rotation: false,
            allow_specials: true
          },
          created_at: "2025-01-01T00:00:00Z",
          updated_at: "2025-01-01T00:00:00Z"
        };
        
        setBusinessInfo(mockData);
      } catch (error) {
        console.error('Error fetching business info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessInfo();
  }, []);

  const handleEdit = () => {
    navigate('/business/edit');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading business information...</Typography>
      </Container>
    );
  }

  if (!businessInfo) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>No business information found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Business Information
        </Typography>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={handleEdit}
        >
          Edit Information
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Business sx={{ mr: 1 }} />
                <Typography variant="h6">Basic Information</Typography>
              </Box>
              <Typography><strong>Business Name:</strong> {businessInfo.businessName}</Typography>
              <Typography><strong>Type:</strong> {businessInfo.businessType}</Typography>
              <Typography><strong>Description:</strong> {businessInfo.description}</Typography>
              <Typography><strong>Business ID:</strong> {businessInfo.businessId}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="h6">Contact Information</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1, fontSize: 16 }} />
                <Typography>{businessInfo.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1, fontSize: 16 }} />
                <Typography>{businessInfo.phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Public sx={{ mr: 1, fontSize: 16 }} />
                <Typography>{businessInfo.website}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="h6">Address</Typography>
              </Box>
              <Typography>{businessInfo.address.street}</Typography>
              <Typography>
                {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zipCode}
              </Typography>
              <Typography>{businessInfo.address.country}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Business Hours */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Business Hours</Typography>
              {Object.entries(businessInfo.businessHours).map(([day, hours]) => (
                <Typography key={day}>
                  <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {hours.open} - {hours.close}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Features */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Features</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  label="Online Ordering" 
                  color={businessInfo.features.online_ordering_enabled ? 'success' : 'default'}
                />
                <Chip 
                  label="Multi-Language" 
                  color={businessInfo.features.multi_language_enabled ? 'success' : 'default'}
                />
                <Chip 
                  label="Auto Display Rotation" 
                  color={businessInfo.features.auto_display_rotation ? 'success' : 'default'}
                />
                <Chip 
                  label="Allow Specials" 
                  color={businessInfo.features.allow_specials ? 'success' : 'default'}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Created:</strong> {new Date(businessInfo.created_at).toLocaleDateString()}
          <br />
          <strong>Last Updated:</strong> {new Date(businessInfo.updated_at).toLocaleDateString()}
        </Typography>
      </Box>
    </Container>
  );
};

export default ViewBusinessInfo;