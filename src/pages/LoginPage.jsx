import React, { useState } from 'react';
import axios from 'axios';
import { Box, Container, TextField, Typography, Button, Grid, Paper, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
const process = import.meta.env;
import {useAuth} from "../AuthContext";
import { useNavigate } from 'react-router-dom';

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
  const [step, setStep] = useState('login'); 
  const [otp, setOtp] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {login}= useAuth();
  const navigate = useNavigate();

  const handleBackToMainSite = () => {
    window.location.href = '/'; 
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.VITE_HOST_URL}/api/authenticateAdmin`, { email, password });
      login(response.data.user);
      setError(null);
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleForgotPassword = () => {
    setStep('email'); // Move to the email input step
  };

  const handleSendOtp = async () => {
    try {
      // Send OTP to the entered email
      const response = await axios.post(`${process.VITE_HOST_URL}/api/forgot-password/check-user`, { email });
 
      if(response.data.status == -1 || response.data.status == -2){
        setError("User does not exists");
        setStep('login');
      }else {
        const response2 = await axios.post(`${process.VITE_HOST_URL}/api/forgot-password/sendOTP`, { email });
      if(response2.data.message == "OTP Sent"){
        setStep('otp'); // Move to OTP verification step
      }
      }
      
    } catch (error) {
      setError('Error sending OTP');
    }
  };

  
  const handleVerifyOtp = async () => {
    try {
      // Verify OTP
      const response = await axios.post(`${process.VITE_HOST_URL}/api/forgot-password/verify-otp`, { email, otp });
      if(response.data.status == 0 || response.data.status == -1){
        setError(response.data.message);
        if(response.data.status == -1){
          setStep('email');
        }
      } else if(response.data.status == 1){
        setStep('resetPassword'); // Move to reset password step
      }
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Reset the password
      const response = await axios.post(`${process.VITE_HOST_URL}/api/forgot-password/reset-password`, { email, newPassword });
      setStep('login'); // Move back to login
    } catch (error) {
      setError('Error resetting password');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <LockOutlinedIcon color="primary" fontSize="large" />
          <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
            {step === 'login' ? 'Admin Login' : 'Forgot Password'}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}

          {/* Render based on current step */}
          {step === 'login' && (
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
              <Button type="submit" fullWidth variant="contained" sx={{ marginTop: 3, marginBottom: 2,backgroundColor: '#335064',
    '&:hover': {
      backgroundColor: '#243947',
    } }}>
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button variant="body2" onClick={handleForgotPassword}>
                    Forgot password?
                  </Button>
                </Grid>
              </Grid>
<center>
              <StyledButton onClick={handleBackToMainSite} sx={{backgroundColor: '#335064',
    '&:hover': {
      backgroundColor: '#243947',
    }}}>
            Back to Main Website
          </StyledButton>
          </center>
            </Box>
           
          )}

          {step === 'email' && (
            <Box sx={{ marginTop: 1 }}>
              <Typography>Enter your email to reset your password</Typography>
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
              <StyledButton onClick={handleSendOtp} sx={{backgroundColor: '#335064',
    '&:hover': {
      backgroundColor: '#243947',
    }}}>Send OTP</StyledButton>
            </Box>
          )}

          {step === 'otp' && (
            <Box sx={{ marginTop: 1 }}>
              <Typography>Enter the OTP sent to your email</Typography>
              <TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="otp"
  label="OTP"
  value={otp}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value); // Only allow numeric input and up to 6 digits
    }
  }}
  inputProps={{
    maxLength: 6, // Limit the number of characters to 6
    inputMode: 'numeric', // Display numeric keypad on mobile devices
  }}
/>
              <StyledButton onClick={handleVerifyOtp}>Verify OTP</StyledButton>
            </Box>
          )}

          {step === 'resetPassword' && (
            <Box sx={{ marginTop: 1 }}>
              <Typography>Enter your new password</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <StyledButton onClick={handleResetPassword}>Reset Password</StyledButton>
            </Box>
          )}
          
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
