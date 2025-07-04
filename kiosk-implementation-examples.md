# Kiosk Implementation Examples

This document provides practical implementation examples based on the existing portal.akilah.io codebase structure.

## 1. Material-UI Kiosk Components

### Enhanced Kiosk Dashboard Component

```typescript
// src/pages/KioskManagementPages/KioskInterfaceDesign.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Divider,
  Chip,
  IconButton,
  TouchRipple,
  useTheme,
  styled
} from '@mui/material';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import PaymentIcon from '@mui/icons-material/Payment';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

// Kiosk-optimized styled components
const KioskButton = styled(Button)(({ theme }) => ({
  minHeight: '80px',
  fontSize: '1.5rem',
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const KioskCard = styled(Card)(({ theme }) => ({
  minHeight: '200px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[12],
  },
}));

interface KioskInterfaceProps {
  locationId: string;
  conceptId: string;
}

const KioskInterfaceDesign: React.FC<KioskInterfaceProps> = ({ locationId, conceptId }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cart, setCart] = useState<any[]>([]);

  const categories = [
    { id: 'burgers', name: 'Burgers', icon: '🍔', color: 'primary' },
    { id: 'drinks', name: 'Drinks', icon: '🥤', color: 'secondary' },
    { id: 'sides', name: 'Sides', icon: '🍟', color: 'success' },
    { id: 'desserts', name: 'Desserts', icon: '🍰', color: 'warning' },
  ];

  return (
    <Box sx={{ 
      p: 3, 
      height: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'hidden'
    }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        sx={{ 
          color: 'white', 
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        Welcome to Our Kiosk
      </Typography>
      
      <Grid container spacing={3} sx={{ height: 'calc(100vh - 120px)' }}>
        {/* Category Selection */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <RestaurantMenuIcon sx={{ mr: 1 }} />
              Select Category
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              {categories.map((category) => (
                <Grid item xs={6} key={category.id}>
                  <KioskCard 
                    onClick={() => setSelectedCategory(category.id)}
                    sx={{
                      bgcolor: selectedCategory === category.id ? 
                        theme.palette[category.color as keyof typeof theme.palette].light :
                        'white'
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h2" component="div" sx={{ mb: 1 }}>
                        {category.icon}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {category.name}
                      </Typography>
                    </CardContent>
                  </KioskCard>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Cart and Checkout */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PaymentIcon sx={{ mr: 1 }} />
              Your Order
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {cart.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <TouchAppIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Select items to start your order
                </Typography>
              </Box>
            ) : (
              <Box sx={{ height: 'calc(100% - 200px)', overflowY: 'auto' }}>
                {/* Cart items would go here */}
              </Box>
            )}
            
            <Box sx={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
              <KioskButton
                variant="contained"
                color="primary"
                fullWidth
                disabled={cart.length === 0}
                sx={{ mb: 2 }}
              >
                Checkout - $0.00
              </KioskButton>
              <KioskButton
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => setCart([])}
              >
                Clear Order
              </KioskButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KioskInterfaceDesign;
```

## 2. Stripe Integration Components

### Kiosk Payment Processing

```typescript
// src/components/KioskPayment/StripeKioskPayment.tsx
import React, { useState, useEffect } from 'react';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  styled
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const KioskPaymentElement = styled(Box)(({ theme }) => ({
  '& .StripeElement': {
    height: '60px',
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    fontSize: '18px',
    fontFamily: theme.typography.fontFamily,
    '&--focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
    },
  },
}));

interface KioskPaymentProps {
  orderTotal: number;
  onPaymentSuccess: (paymentIntent: any) => void;
  onPaymentError: (error: any) => void;
}

const KioskPaymentForm: React.FC<KioskPaymentProps> = ({
  orderTotal,
  onPaymentSuccess,
  onPaymentError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Enter Payment', 'Processing', 'Complete'];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setPaymentError(null);
    setActiveStep(1);

    try {
      // Create payment intent on server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(orderTotal * 100), // Convert to cents
          currency: 'usd',
          automatic_payment_methods: { enabled: true }
        })
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/kiosk/payment-success`,
        },
        redirect: 'if_required'
      });

      if (error) {
        setPaymentError(error.message || 'Payment failed');
        setActiveStep(0);
        onPaymentError(error);
      } else if (paymentIntent.status === 'succeeded') {
        setActiveStep(2);
        onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      setPaymentError('Network error. Please try again.');
      setActiveStep(0);
      onPaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Paper elevation={8} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        <CreditCardIcon sx={{ mr: 1, fontSize: 40 }} />
        Secure Payment
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h3" color="primary" fontWeight="bold">
          ${orderTotal.toFixed(2)}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Total Amount
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <KioskPaymentElement>
          <PaymentElement
            options={{
              layout: {
                type: 'tabs',
                defaultCollapsed: false,
              },
              paymentMethodOrder: ['card'],
            }}
          />
        </KioskPaymentElement>

        {paymentError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {paymentError}
          </Alert>
        )}

        <Box sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={!stripe || isProcessing}
            sx={{ 
              minHeight: '60px',
              fontSize: '1.25rem',
              mb: 2
            }}
          >
            {isProcessing ? (
              <CircularProgress size={24} sx={{ mr: 1 }} />
            ) : null}
            {isProcessing ? 'Processing...' : `Pay $${orderTotal.toFixed(2)}`}
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SecurityIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              Your payment is secured with 256-bit SSL encryption
            </Typography>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

// Main component wrapper
const StripeKioskPayment: React.FC<KioskPaymentProps> = (props) => {
  const options = {
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#1976d2',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Roboto, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <KioskPaymentForm {...props} />
    </Elements>
  );
};

export default StripeKioskPayment;
```

## 3. Real-Time Dashboard Components

### Order Tracking Dashboard

```typescript
// src/pages/KioskManagementPages/KioskOrderDashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Avatar,
  Badge,
  styled
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PulsatingDot = styled(TimelineDot)(({ theme }) => ({
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.95)',
      boxShadow: `0 0 0 0 ${theme.palette.primary.main}40`,
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: `0 0 0 10px ${theme.palette.primary.main}00`,
    },
    '100%': {
      transform: 'scale(0.95)',
      boxShadow: `0 0 0 0 ${theme.palette.primary.main}00`,
    },
  },
}));

interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  timestamp: Date;
  estimatedTime: number;
}

const KioskOrderDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    averageWaitTime: 0,
    completionRate: 0,
    revenue: 0
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate order updates
      setOrders(prev => prev.map(order => {
        if (order.status === 'pending') {
          return { ...order, status: 'preparing' as const };
        }
        if (order.status === 'preparing' && Math.random() > 0.7) {
          return { ...order, status: 'ready' as const };
        }
        if (order.status === 'ready' && Math.random() > 0.5) {
          return { ...order, status: 'completed' as const };
        }
        return order;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'preparing': return 'info';
      case 'ready': return 'success';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <AccessTimeIcon />;
      case 'preparing': return <RestaurantIcon />;
      case 'ready': return <LocalShippingIcon />;
      case 'completed': return <CheckCircleIcon />;
      default: return <AccessTimeIcon />;
    }
  };

  const orderVolumeData = {
    labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'],
    datasets: [
      {
        label: 'Orders per Hour',
        data: [5, 8, 12, 25, 30, 20, 15],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const statusDistributionData = {
    labels: ['Pending', 'Preparing', 'Ready', 'Completed'],
    datasets: [
      {
        data: [
          orders.filter(o => o.status === 'pending').length,
          orders.filter(o => o.status === 'preparing').length,
          orders.filter(o => o.status === 'ready').length,
          orders.filter(o => o.status === 'completed').length,
        ],
        backgroundColor: ['#ff9800', '#2196f3', '#4caf50', '#9e9e9e'],
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Kiosk Order Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Metrics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Orders
              </Typography>
              <Typography variant="h4" color="primary">
                {orders.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Avg Wait Time
              </Typography>
              <Typography variant="h4" color="warning.main">
                {metrics.averageWaitTime} min
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Completion Rate
              </Typography>
              <Typography variant="h4" color="success.main">
                {metrics.completionRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Revenue
              </Typography>
              <Typography variant="h4" color="primary">
                ${metrics.revenue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Timeline */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Live Order Status
            </Typography>
            <Timeline>
              {orders.slice(0, 6).map((order) => (
                <TimelineItem key={order.id}>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    {order.timestamp.toLocaleTimeString()}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    {order.status === 'preparing' ? (
                      <PulsatingDot color="primary">
                        {getStatusIcon(order.status)}
                      </PulsatingDot>
                    ) : (
                      <TimelineDot color={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                      </TimelineDot>
                    )}
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" component="span">
                        Order #{order.orderNumber}
                      </Typography>
                      <Chip
                        label={order.status.toUpperCase()}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                      ${order.total.toFixed(2)}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Status Distribution
            </Typography>
            <Box sx={{ height: 200, display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={statusDistributionData} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Volume Trend
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line
                data={orderVolumeData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KioskOrderDashboard;
```

## 4. Integration with Existing Components

### Enhanced KioskDashboard.tsx

```typescript
// Modifications to existing src/pages/KioskManagementPages/KioskDashboard.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  Tab,
  Tabs,
  Alert
} from '@mui/material';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';

// Import our new components
import KioskInterfaceDesign from './KioskInterfaceDesign';
import KioskOrderDashboard from './KioskOrderDashboard';
import StripeKioskPayment from '../../components/KioskPayment/StripeKioskPayment';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`kiosk-tabpanel-${index}`}
      aria-labelledby={`kiosk-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const EnhancedKioskDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [kiosks, setKiosks] = useState([
    {
      id: '1',
      name: 'Front Entrance Kiosk 1',
      location: 'Main Entrance',
      status: 'online',
      lastUpdated: '2023-05-15T14:30:00',
      isActive: true,
      paymentIntegration: 'stripe',
      touchscreenOptimized: true,
      orderCount: 45,
      revenue: 1250.75
    },
    // ... more kiosks
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePaymentTest = async (kioskId: string) => {
    // Test payment integration
    console.log(`Testing payment for kiosk ${kioskId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Enhanced Kiosk Management
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        This enhanced dashboard includes Material-UI optimization, Stripe integration, 
        and real-time order tracking capabilities.
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="kiosk management tabs">
          <Tab icon={<TabletMacIcon />} label="Kiosk Overview" />
          <Tab icon={<DashboardIcon />} label="Order Dashboard" />
          <Tab icon={<SettingsIcon />} label="Interface Design" />
          <Tab icon={<PaymentIcon />} label="Payment Testing" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {/* Existing kiosk overview content with enhancements */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Kiosk Fleet Status
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                {kiosks.map((kiosk) => (
                  <ListItem key={kiosk.id} divider>
                    <ListItemIcon>
                      <TabletMacIcon color={kiosk.status === 'online' ? 'primary' : 'disabled'} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {kiosk.name}
                          <Chip 
                            label={kiosk.status.toUpperCase()} 
                            size="small" 
                            color={kiosk.status === 'online' ? 'success' : 'error'}
                            sx={{ ml: 1 }}
                          />
                          {kiosk.touchscreenOptimized && (
                            <Chip 
                              label="TOUCH OPTIMIZED" 
                              size="small" 
                              color="primary"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Box>
                      } 
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Location: {kiosk.location} | Orders: {kiosk.orderCount} | Revenue: ${kiosk.revenue}
                          </Typography>
                          <Typography variant="body2">
                            Payment: {kiosk.paymentIntegration.toUpperCase()} | 
                            Last Updated: {new Date(kiosk.lastUpdated).toLocaleString()}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={() => handlePaymentTest(kiosk.id)}
                        sx={{ mr: 1 }}
                      >
                        Test Payment
                      </Button>
                      <Button 
                        variant="contained" 
                        size="small"
                        startIcon={<VisibilityIcon />}
                      >
                        View Live
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Fleet Performance" />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Total Kiosks:</Typography>
                  <Typography variant="body1" fontWeight="bold">{kiosks.length}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Online:</Typography>
                  <Typography variant="body1" fontWeight="bold" color="success.main">
                    {kiosks.filter(k => k.status === 'online').length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Touch Optimized:</Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary.main">
                    {kiosks.filter(k => k.touchscreenOptimized).length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Total Revenue:</Typography>
                  <Typography variant="body1" fontWeight="bold" color="success.main">
                    ${kiosks.reduce((sum, k) => sum + k.revenue, 0).toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <KioskOrderDashboard />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <KioskInterfaceDesign locationId="main" conceptId="primary" />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <StripeKioskPayment
          orderTotal={25.99}
          onPaymentSuccess={(paymentIntent) => {
            console.log('Payment successful:', paymentIntent);
          }}
          onPaymentError={(error) => {
            console.error('Payment error:', error);
          }}
        />
      </TabPanel>
    </Box>
  );
};

export default EnhancedKioskDashboard;
```

This implementation provides:

1. **Material-UI Optimization**: Touch-friendly components with appropriate sizing and visual feedback
2. **Stripe Integration**: Complete payment processing with error handling and security
3. **Real-time Dashboard**: Live order tracking with charts and timeline visualization
4. **Enhanced UX**: Smooth animations, proper spacing, and intuitive navigation
5. **Existing Code Integration**: Builds upon the current KioskDashboard component structure

The components are designed to be modular and can be easily integrated into the existing codebase structure.