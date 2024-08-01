import React from 'react';
import { Box, Container, TextField, Typography, Button, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', // Customize primary color
    },
    secondary: {
      main: '#004d40', // Customize secondary color
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif', // Use Nunito font
  },
});

const StyledPaper = styled(Paper)({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const LoginPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <LockOutlinedIcon color="primary" fontSize="large" />
          <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
            Admin Login
          </Typography>
          <Box component="form" sx={{ marginTop: 1 }}>
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
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
