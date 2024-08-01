// src/pages/AdminPanel.jsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useAuth } from '../AuthContext';

const AdminPanel = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Admin Panel
      </Typography>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
};

export default AdminPanel;
