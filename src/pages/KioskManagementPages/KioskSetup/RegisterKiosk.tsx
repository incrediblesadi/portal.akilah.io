import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const RegisterKiosk: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register Kiosk
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Register a new self-service kiosk for your business.
        </Typography>
        
        <Box sx={{ mt: 4, textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Kiosk Registration Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This feature will allow you to register and configure self-service kiosks.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterKiosk;