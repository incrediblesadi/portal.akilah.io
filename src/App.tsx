import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Authentication pages
import SignIn from './pages/SignInPages/SignIn';
import SignUp from './pages/SignupPages/SignUp';

// User configuration pages
import UserProfile from './pages/UserManagementPages/UserProfile';

// Business Management pages
import BusinessDashboard from './pages/BusinessManagementPages/BusinessDashboard';
import SetupBusiness from './pages/BusinessManagementPages/SetupBusiness';

// Other dashboard pages
import MenuDashboard from './pages/MenuManagementPages/MenuDashboard';
import DisplayDashboard from './pages/DisplayManagementPages/DisplayDashboard';
import KioskDashboard from './pages/KioskManagementPages/KioskDashboard';
import KDCDashboard from './pages/KDCManagementPages/KDCDashboard';

// Components
import Navbar from './components/Navbar/Navbar';
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

function AuthenticatedApp() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/business/dashboard" />} />
          <Route path="/signin" element={<Navigate to="/business/dashboard" />} />
          <Route path="/signup" element={<Navigate to="/business/dashboard" />} />
          
          {/* User Management Routes */}
          <Route path="/user/profile" element={<UserProfile />} />
          
          {/* Business Management Routes */}
          <Route path="/business/dashboard" element={<BusinessDashboard />} />
          <Route path="/business/setup" element={<SetupBusiness />} />
          
          {/* Other Dashboard Routes */}
          <Route path="/menu/dashboard" element={<MenuDashboard />} />
          <Route path="/display/dashboard" element={<DisplayDashboard />} />
          <Route path="/kiosk/dashboard" element={<KioskDashboard />} />
          <Route path="/kdc/dashboard" element={<KDCDashboard />} />
          
          {/* Repository Map */}
          <Route path="/repository-map" element={<RepositoryMap />} />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/business/dashboard" />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppProvider>
          <Router>
            <AuthenticatedApp />
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
