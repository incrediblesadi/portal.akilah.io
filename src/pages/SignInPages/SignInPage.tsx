import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Alert,
  Link,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // TODO: Implement actual authentication logic
      console.log('Sign in attempt:', credentials);
      
      // Simulate authentication API call
      if (credentials.email && credentials.password) {
        // Simulate successful login
        console.log('Login successful');
        navigate('/business');
      } else {
        setErrorMessage('Please enter both email and password');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to your Business Portal account
          </Typography>
        </Box>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSignIn}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={credentials.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            sx={{ mb: 3 }}
            autoComplete="email"
            autoFocus
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
            sx={{ mb: 3 }}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mb: 3 }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <Box sx={{ textAlign: 'center' }}>
          <Link href="#" variant="body2" sx={{ mb: 2, display: 'block' }}>
            Forgot your password?
          </Link>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Don't have an account?
          </Typography>
          
          <Button
            variant="outlined"
            fullWidth
            onClick={handleSignUp}
          >
            Create Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInPage;