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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  hasModifiers: boolean;
  imageUrl?: string;
}

interface Category {
  id: string;
  name: string;
  itemCount: number;
}

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
      id={`menu-tabpanel-${index}`}
      aria-labelledby={`menu-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MenuDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [menuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Classic Burger',
      description: 'Beef patty with lettuce, tomato, and special sauce',
      price: 9.99,
      category: 'Main Dishes',
      isAvailable: true,
      hasModifiers: true
    },
    {
      id: '2',
      name: 'Caesar Salad',
      description: 'Romaine lettuce, croutons, parmesan, and Caesar dressing',
      price: 7.99,
      category: 'Salads',
      isAvailable: true,
      hasModifiers: true
    },
    {
      id: '3',
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with ganache',
      price: 5.99,
      category: 'Desserts',
      isAvailable: false,
      hasModifiers: false
    },
    {
      id: '4',
      name: 'Craft Beer',
      description: 'Local IPA',
      price: 6.99,
      category: 'Drinks',
      isAvailable: true,
      hasModifiers: false
    }
  ]);

  const [categories] = useState<Category[]>([
    { id: '1', name: 'Main Dishes', itemCount: 1 },
    { id: '2', name: 'Salads', itemCount: 1 },
    { id: '3', name: 'Desserts', itemCount: 1 },
    { id: '4', name: 'Drinks', itemCount: 1 }
  ]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getCategoryIcon = (categoryName: string) => {
    switch(categoryName.toLowerCase()) {
      case 'main dishes': return <FastfoodIcon />;
      case 'salads': return <RestaurantMenuIcon />;
      case 'desserts': return <BakeryDiningIcon />;
      case 'drinks': return <LocalBarIcon />;
      default: return <CategoryIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Menu Management
        </Typography>
        <Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 1 }}>
            Add Menu Item
          </Button>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add Category
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="menu management tabs">
          <Tab label="Menu Items" />
          <Tab label="Categories" />
          <Tab label="Modifiers" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Menu Items
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemIcon>
                      {getCategoryIcon(item.category)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {item.name}
                          <Chip 
                            label={`$${item.price.toFixed(2)}`} 
                            size="small" 
                            color="primary"
                            sx={{ ml: 1 }}
                          />
                          {!item.isAvailable && (
                            <Chip 
                              label="UNAVAILABLE" 
                              size="small" 
                              color="error"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Box>
                      } 
                      secondary={
                        <Box>
                          <Typography variant="body2">{item.description}</Typography>
                          <Typography variant="body2">
                            Category: {item.category} | 
                            {item.hasModifiers ? ' Has modifiers' : ' No modifiers'}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Categories
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                {categories.map((category) => (
                  <ListItem key={category.id} divider>
                    <ListItemIcon>
                      {getCategoryIcon(category.name)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={category.name} 
                      secondary={`${category.itemCount} item${category.itemCount !== 1 ? 's' : ''}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Category Management" />
              <CardContent>
                <Typography variant="body1" paragraph>
                  Categories help organize your menu items for easier navigation.
                </Typography>
                <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                  Reorder Categories
                </Button>
                <Button variant="outlined" fullWidth>
                  Manage Category Visibility
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Modifiers
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body1" paragraph>
                Modifiers allow customers to customize menu items. Create modifier groups and options here.
              </Typography>
              
              <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 1 }}>
                Add Modifier Group
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default MenuDashboard;