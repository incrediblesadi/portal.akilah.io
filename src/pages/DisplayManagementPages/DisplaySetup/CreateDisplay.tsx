import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const CreateDisplay: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Display
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Set up a new digital menu display for your business.
        </Typography>
        
        <Box sx={{ mt: 4, textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Display Setup Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This feature will allow you to create and configure digital menu displays.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateDisplay;