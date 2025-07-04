# Kiosk Technical Specifications

## 1. Material-UI Configuration for Kiosk Interfaces

### Custom Theme Configuration

```typescript
// src/theme/kioskTheme.ts
import { createTheme } from '@mui/material/styles';

export const kioskTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16, // Larger base font size for kiosks
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1.125rem', // Larger body text
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '1.125rem',
      fontWeight: 600,
      textTransform: 'none', // Preserve original case
    },
  },
  components: {
    // Button optimizations for touch interfaces
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 48, // WCAG AA compliance
          padding: '12px 24px',
          borderRadius: 8,
          fontSize: '1.125rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        sizeLarge: {
          minHeight: 64,
          padding: '16px 32px',
          fontSize: '1.25rem',
        },
        sizeSmall: {
          minHeight: 40,
          padding: '8px 16px',
          fontSize: '1rem',
        },
      },
    },
    // Card optimizations
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
    // List item optimizations
    MuiListItem: {
      styleOverrides: {
        root: {
          minHeight: 64,
          padding: '16px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    // Chip optimizations
    MuiChip: {
      styleOverrides: {
        root: {
          height: 32,
          fontSize: '0.875rem',
          fontWeight: 500,
        },
        sizeLarge: {
          height: 40,
          fontSize: '1rem',
        },
      },
    },
    // Text field optimizations
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            minHeight: 56,
            fontSize: '1.125rem',
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.125rem',
          },
        },
      },
    },
    // Dialog optimizations for kiosk modals
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          padding: '24px',
          maxWidth: '90vw',
          maxHeight: '90vh',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 8, // 8px base spacing unit
});
```

### Touch-Optimized Component Library

```typescript
// src/components/KioskUI/index.ts
export { default as KioskButton } from './KioskButton';
export { default as KioskCard } from './KioskCard';
export { default as KioskDialog } from './KioskDialog';
export { default as KioskNumberPad } from './KioskNumberPad';
export { default as KioskQuantitySelector } from './KioskQuantitySelector';
export { default as KioskCategoryGrid } from './KioskCategoryGrid';
export { default as KioskMenuItem } from './KioskMenuItem';
export { default as KioskCart } from './KioskCart';
export { default as KioskPaymentForm } from './KioskPaymentForm';
export { default as KioskOrderSummary } from './KioskOrderSummary';
export { default as KioskProgressIndicator } from './KioskProgressIndicator';
```

## 2. Stripe Integration Configuration

### Environment Variables

```bash
# .env.local
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
REACT_APP_STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Stripe Configuration

```typescript
// src/config/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!
);

export const stripeOptions = {
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#1976d2',
      colorBackground: '#ffffff',
      colorText: '#212121',
      colorDanger: '#d32f2f',
      fontFamily: 'Roboto, sans-serif',
      spacingUnit: '8px',
      borderRadius: '8px',
    },
    rules: {
      '.Input': {
        fontSize: '18px',
        padding: '16px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
      },
      '.Input:focus': {
        borderColor: '#1976d2',
        boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
      },
      '.Label': {
        fontSize: '16px',
        fontWeight: '500',
        color: '#424242',
        marginBottom: '8px',
      },
    },
  },
  loader: 'auto',
};
```

### Payment Intent Creation

```typescript
// src/api/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        source: 'kiosk',
        timestamp: new Date().toISOString(),
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const confirmPayment = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

export const handleWebhook = async (body: string, signature: string) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.REACT_APP_STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object);
        // Handle successful payment
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object);
        // Handle failed payment
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
};
```

## 3. PayPal Integration Configuration

### PayPal Configuration

```typescript
// src/config/paypal.ts
export const paypalOptions = {
  'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID!,
  currency: 'USD',
  intent: 'capture',
  components: 'buttons',
  'disable-funding': 'credit,card,sepa,bancontact,eps,giropay,ideal,mybank,p24,sofort,venmo',
  'enable-funding': 'paylater',
  locale: 'en_US',
  'buyer-country': 'US',
  'merchant-id': process.env.REACT_APP_PAYPAL_MERCHANT_ID,
  vault: false,
  commit: true,
  debug: process.env.NODE_ENV === 'development',
};

export const paypalButtonStyle = {
  layout: 'vertical',
  color: 'blue',
  shape: 'rect',
  label: 'paypal',
  height: 60,
  tagline: false,
  responsive: true,
};
```

### PayPal Order Creation

```typescript
// src/api/paypal.ts
export const createPayPalOrder = async (amount: number, currency: string = 'USD') => {
  try {
    const response = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount.toFixed(2),
        currency,
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
            description: 'Kiosk Order',
          },
        ],
        application_context: {
          brand_name: 'Your Restaurant Name',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${window.location.origin}/kiosk/payment-success`,
          cancel_url: `${window.location.origin}/kiosk/payment-cancel`,
        },
      }),
    });

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw error;
  }
};

export const capturePayPalPayment = async (orderId: string) => {
  try {
    const response = await fetch(`/api/paypal/capture-order/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    throw error;
  }
};
```

## 4. Real-Time Dashboard Configuration

### AWS AppSync Configuration

```typescript
// src/config/appsync.ts
import { generateClient } from 'aws-amplify/api';
import { createOrder, updateOrder } from '../graphql/mutations';
import { getOrder, listOrders } from '../graphql/queries';
import { onCreateOrder, onUpdateOrder } from '../graphql/subscriptions';

export const client = generateClient();

export const orderOperations = {
  create: createOrder,
  update: updateOrder,
  get: getOrder,
  list: listOrders,
  subscribe: {
    onCreate: onCreateOrder,
    onUpdate: onUpdateOrder,
  },
};
```

### GraphQL Schema for Orders

```graphql
# amplify/data/resource.ts
type Order @model @auth(rules: [{ allow: public }]) {
  id: ID!
  orderNumber: String!
  status: OrderStatus!
  items: [OrderItem!]!
  total: Float!
  tax: Float!
  subtotal: Float!
  customerId: String
  kioskId: String!
  locationId: String!
  paymentIntentId: String
  paymentMethod: PaymentMethod!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  estimatedCompletionTime: AWSDateTime
  actualCompletionTime: AWSDateTime
  notes: String
}

type OrderItem @model @auth(rules: [{ allow: public }]) {
  id: ID!
  orderId: ID! @index(name: "byOrder")
  menuItemId: String!
  name: String!
  price: Float!
  quantity: Int!
  modifiers: [OrderItemModifier!]
  specialInstructions: String
}

type OrderItemModifier @model @auth(rules: [{ allow: public }]) {
  id: ID!
  orderItemId: ID! @index(name: "byOrderItem")
  name: String!
  price: Float!
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  COMPLETED
  CANCELLED
}

enum PaymentMethod {
  STRIPE
  PAYPAL
  CASH
}
```

### Real-Time Order Tracking Hook

```typescript
// src/hooks/useOrderTracking.ts
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { orderOperations } from '../config/appsync';

export const useOrderTracking = (kioskId?: string) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const client = generateClient();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await client.graphql({
          query: orderOperations.list,
          variables: {
            filter: kioskId ? { kioskId: { eq: kioskId } } : undefined,
            limit: 100,
          },
        });
        setOrders(response.data.listOrders.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [kioskId]);

  useEffect(() => {
    // Subscribe to new orders
    const createSubscription = client.graphql({
      query: orderOperations.subscribe.onCreate,
      variables: kioskId ? { kioskId } : undefined,
    }).subscribe({
      next: ({ data }) => {
        setOrders(prev => [data.onCreateOrder, ...prev]);
      },
      error: (err) => {
        console.error('Create subscription error:', err);
      },
    });

    // Subscribe to order updates
    const updateSubscription = client.graphql({
      query: orderOperations.subscribe.onUpdate,
      variables: kioskId ? { kioskId } : undefined,
    }).subscribe({
      next: ({ data }) => {
        setOrders(prev => 
          prev.map(order => 
            order.id === data.onUpdateOrder.id ? data.onUpdateOrder : order
          )
        );
      },
      error: (err) => {
        console.error('Update subscription error:', err);
      },
    });

    return () => {
      createSubscription.unsubscribe();
      updateSubscription.unsubscribe();
    };
  }, [kioskId]);

  const createOrder = async (orderData: any) => {
    try {
      const response = await client.graphql({
        query: orderOperations.create,
        variables: { input: orderData },
      });
      return response.data.createOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const updateOrder = async (orderId: string, updateData: any) => {
    try {
      const response = await client.graphql({
        query: orderOperations.update,
        variables: { input: { id: orderId, ...updateData } },
      });
      return response.data.updateOrder;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    refetch: () => {
      setOrders([]);
      setLoading(true);
      // Refetch logic here
    },
  };
};
```

## 5. Chart.js Configuration for Analytics

### Chart Configuration

```typescript
// src/config/charts.ts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 14,
          weight: '500',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 16,
        weight: '600',
      },
      bodyFont: {
        size: 14,
      },
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart',
  },
};

export const colorPalette = {
  primary: '#1976d2',
  secondary: '#dc004e',
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  info: '#0288d1',
  light: '#f5f5f5',
  dark: '#212121',
  gradients: {
    primary: ['#1976d2', '#42a5f5'],
    secondary: ['#dc004e', '#ff5983'],
    success: ['#2e7d32', '#66bb6a'],
    warning: ['#ed6c02', '#ffb74d'],
  },
};
```

## 6. Performance Optimization

### Bundle Optimization

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'mui-core': ['@mui/material', '@mui/icons-material'],
          'stripe': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'charts': ['chart.js', 'react-chartjs-2'],
          'aws': ['aws-amplify', '@aws-amplify/ui-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@stripe/stripe-js',
      '@stripe/react-stripe-js',
      'chart.js',
      'react-chartjs-2',
    ],
  },
});
```

### Service Worker for Caching

```typescript
// public/sw.js
const CACHE_NAME = 'kiosk-app-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
```

## 7. Security Configuration

### Content Security Policy

```typescript
// src/config/security.ts
export const cspConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'https://js.stripe.com',
    'https://www.paypal.com',
    'https://www.sandbox.paypal.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
  ],
  'connect-src': [
    "'self'",
    'https://api.stripe.com',
    'https://api.paypal.com',
    'https://api.sandbox.paypal.com',
    'wss://your-appsync-endpoint.amazonaws.com',
  ],
  'img-src': [
    "'self'",
    'data:',
    'https://logos.stripe.com',
    'https://www.paypal.com',
  ],
  'frame-src': [
    'https://js.stripe.com',
    'https://www.paypal.com',
    'https://www.sandbox.paypal.com',
  ],
};
```

### Session Management

```typescript
// src/hooks/useKioskSession.ts
import { useState, useEffect, useCallback } from 'react';

export const useKioskSession = (timeoutMinutes: number = 5) => {
  const [isActive, setIsActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(timeoutMinutes * 60);

  const resetTimer = useCallback(() => {
    setTimeLeft(timeoutMinutes * 60);
    setIsActive(true);
  }, [timeoutMinutes]);

  const handleActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [handleActivity]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    isActive,
    timeLeft,
    resetTimer,
    formatTimeLeft: () => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },
  };
};
```

This technical specification provides the detailed configuration and implementation details needed to build a production-ready kiosk application with the recommended tools and frameworks.