import { useState } from 'react';
import { Box, Typography, Paper, Card, CardContent, Grid, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const MenuManagement = () => {
  const [menuItems] = useState([
    { id: 1, name: 'Burger', category: 'Main Course', price: 12.99, description: 'Classic beef burger with lettuce, tomato, and onion' },
    { id: 2, name: 'Pizza', category: 'Main Course', price: 15.99, description: 'Margherita pizza with fresh mozzarella and basil' },
    { id: 3, name: 'Caesar Salad', category: 'Salads', price: 8.99, description: 'Fresh romaine lettuce with Caesar dressing and croutons' },
    { id: 4, name: 'Chocolate Cake', category: 'Desserts', price: 6.99, description: 'Rich chocolate cake with vanilla ice cream' },
  ]);

  const categories = ['Main Course', 'Salads', 'Desserts'];

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Menu Management
        </Typography>
        <Button variant="contained">
          Add New Item
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {categories.map(category => (
          <Grid item xs={12} key={category}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                  {category}
                </Typography>
                <List>
                  {menuItems
                    .filter(item => item.category === category)
                    .map((item, index) => (
                      <div key={item.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="h6" color="primary">${item.price}</Typography>
                              </Box>
                            }
                            secondary={item.description}
                          />
                        </ListItem>
                        {index < menuItems.filter(i => i.category === category).length - 1 && <Divider />}
                      </div>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="outlined">
          Import Menu
        </Button>
        <Button variant="outlined">
          Export Menu
        </Button>
        <Button variant="outlined">
          Preview Menu
        </Button>
      </Box>
    </Paper>
  );
};

export default MenuManagement;