import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CustomVideoPlayer from './components/CustomVideoPlayer';
import Layout from './components/Layout';
import theme from './theme';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? (
        <Layout>
          <Dashboard />
          <CustomVideoPlayer />
        </Layout>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </ThemeProvider>
  );
}

export default App;
