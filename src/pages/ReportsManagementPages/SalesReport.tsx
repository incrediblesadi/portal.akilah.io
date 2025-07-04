import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
} from '@mui/material';
import {
  Download as DownloadIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';

interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  growth: number;
}

interface TopItem {
  name: string;
  quantity: number;
  revenue: number;
  category: string;
}

const SalesReport: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last30days');
  const [reportType, setReportType] = useState('daily');
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [topItems, setTopItems] = useState<TopItem[]>([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    growthRate: 0,
  });

  useEffect(() => {
    loadSalesData();
  }, [dateRange, reportType]);

  const loadSalesData = async () => {
    setLoading(true);
    try {
      // TODO: Implement sales data loading service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockSalesData: SalesData[] = [
        {
          period: '2024-01-01',
          revenue: 1250.50,
          orders: 45,
          averageOrderValue: 27.79,
          growth: 12.5,
        },
        {
          period: '2024-01-02',
          revenue: 1480.75,
          orders: 52,
          averageOrderValue: 28.48,
          growth: 18.4,
        },
        {
          period: '2024-01-03',
          revenue: 1320.25,
          orders: 48,
          averageOrderValue: 27.51,
          growth: 5.6,
        },
      ];

      const mockTopItems: TopItem[] = [
        {
          name: 'Grilled Chicken Sandwich',
          quantity: 125,
          revenue: 1875.00,
          category: 'Sandwiches',
        },
        {
          name: 'Caesar Salad',
          quantity: 98,
          revenue: 1176.00,
          category: 'Salads',
        },
        {
          name: 'Margherita Pizza',
          quantity: 87,
          revenue: 1565.00,
          category: 'Pizza',
        },
      ];

      setSalesData(mockSalesData);
      setTopItems(mockTopItems);
      setSummary({
        totalRevenue: mockSalesData.reduce((sum, item) => sum + item.revenue, 0),
        totalOrders: mockSalesData.reduce((sum, item) => sum + item.orders, 0),
        averageOrderValue: 28.12,
        growthRate: 12.2,
      });
    } catch (error) {
      console.error('Error loading sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting sales report...');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'success' : growth < 0 ? 'error' : 'default';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Sales Report
          </Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export Report
          </Button>
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Report Filters" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    label="Date Range"
                  >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                    <MenuItem value="last7days">Last 7 Days</MenuItem>
                    <MenuItem value="last30days">Last 30 Days</MenuItem>
                    <MenuItem value="thismonth">This Month</MenuItem>
                    <MenuItem value="lastmonth">Last Month</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    label="Report Type"
                  >
                    <MenuItem value="hourly">Hourly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Custom Date"
                  type="date"
                  disabled={dateRange !== 'custom'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AssessmentIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Total Revenue
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {formatCurrency(summary.totalRevenue)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon color="success" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Total Orders
                    </Typography>
                    <Typography variant="h4" color="success.main">
                      {summary.totalOrders}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DateRangeIcon color="info" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Avg Order Value
                    </Typography>
                    <Typography variant="h4" color="info.main">
                      {formatCurrency(summary.averageOrderValue)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Growth Rate
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ mr: 1 }}>
                    {formatPercentage(summary.growthRate)}
                  </Typography>
                  <Chip
                    label={summary.growthRate > 0 ? 'Growing' : 'Declining'}
                    color={getGrowthColor(summary.growthRate) as any}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Sales Data Table */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Sales Performance" />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Period</TableCell>
                        <TableCell>Revenue</TableCell>
                        <TableCell>Orders</TableCell>
                        <TableCell>Avg Order</TableCell>
                        <TableCell>Growth</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            Loading sales data...
                          </TableCell>
                        </TableRow>
                      ) : (
                        salesData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(row.period).toLocaleDateString()}</TableCell>
                            <TableCell>{formatCurrency(row.revenue)}</TableCell>
                            <TableCell>{row.orders}</TableCell>
                            <TableCell>{formatCurrency(row.averageOrderValue)}</TableCell>
                            <TableCell>
                              <Chip
                                label={formatPercentage(row.growth)}
                                color={getGrowthColor(row.growth) as any}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Top Selling Items" />
              <CardContent>
                {loading ? (
                  <Typography align="center">Loading top items...</Typography>
                ) : (
                  topItems.map((item, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.category}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="body2">
                          Qty: {item.quantity}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(item.revenue)}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SalesReport;