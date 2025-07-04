import { useState } from 'react';
import { Box, Typography, Paper, Card, CardContent, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ViewBusinessInfo = () => {
  const navigate = useNavigate();
  const [businessInfo] = useState({
    name: 'Sample Restaurant',
    address: '123 Main St, City, State 12345',
    phone: '(555) 123-4567',
    email: 'info@samplerestaurant.com',
    hours: 'Mon-Fri 9AM-9PM, Sat-Sun 10AM-8PM',
    description: 'A family-friendly restaurant serving delicious food.'
  });

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Business Information
        </Typography>
        <Button variant="contained" onClick={() => navigate('/business/edit')}>
          Edit Information
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Business Name
              </Typography>
              <Typography variant="body1">
                {businessInfo.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1">
                {businessInfo.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body1">
                {businessInfo.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Business Hours
              </Typography>
              <Typography variant="body1">
                {businessInfo.hours}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Typography variant="body1">
                {businessInfo.address}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">
                {businessInfo.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViewBusinessInfo;