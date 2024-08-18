// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Box, Container, TextField, Typography, Button, Grid, Paper, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b',
    },
    secondary: {
      main: '#004d40',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
});

const StyledPaper = styled(Paper)({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledButton = styled(Button)({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 4),
  borderRadius: '20px',
  backgroundColor: '#004d40',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#00796b',
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/api/authenticateAdmin', { email, password });
      login();
      setError(null);
      navigate('/admin-panel');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleBackToMainSite = () => {
    window.location.href = '/'; // Adjust this to the correct main website URL
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <LockOutlinedIcon color="primary" fontSize="large" />
          <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
            Admin Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleLogin} sx={{ marginTop: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 3, marginBottom: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Button href="#" variant="body2">
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
          </Box>
          <StyledButton onClick={handleBackToMainSite}>
            Back to Main Website
          </StyledButton>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
