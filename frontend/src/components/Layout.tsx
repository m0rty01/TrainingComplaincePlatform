import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography, useTheme } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!hideNav && (
        <AppBar 
          position="static" 
          elevation={0}
          sx={{
            backgroundColor: 'white',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                color: theme.palette.text.primary,
                fontWeight: 600
              }}
            >
              Training Compliance Platform
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1,
          py: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 