import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import BusinessManagementDashboard from './components/BusinessManagementDashboard';
import SetupBusiness from './pages/BusinessManagementPages/SetupBusiness';
import ViewBusinessInfo from './pages/BusinessManagementPages/ViewBusinessInfo';
import EditBusinessInfo from './pages/BusinessManagementPages/EditBusinessInfo';
import MenuManagement from './pages/MenuManagementPages/MenuManagement';
import RepositoryMap from './components/RepositoryMap/RepositoryMap';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Business Management Portal
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<BusinessManagementDashboard />} />
            <Route path="/business/setup" element={<SetupBusiness />} />
            <Route path="/business/view" element={<ViewBusinessInfo />} />
            <Route path="/business/edit" element={<EditBusinessInfo />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/repository-map" element={<RepositoryMap />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
