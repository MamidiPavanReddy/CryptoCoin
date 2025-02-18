import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navigation from './Navigation.jsx';
import CryptoDashboard from './CryptoDashboard.jsx';
import Watchlist from './Watchlist.jsx';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      light: '#404040',
      dark: '#000000',
    },
    secondary: {
      main: '#666666',
      light: '#999999',
      dark: '#333333',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const Layout = ({ children }) => (
  <>
    <Navigation />
    <Box sx={{ flex: 1, padding: '24px' }}>{children}</Box>
  </>
);

const NotFound = () => (
  <Box sx={{ textAlign: 'center', padding: '50px' }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </Box>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Layout><CryptoDashboard /></Layout>} />
            <Route path="/watchlist" element={<Layout><Watchlist /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
