// components/Layout.js
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Layout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Pantry Management
          </Typography>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
}

export default Layout;
