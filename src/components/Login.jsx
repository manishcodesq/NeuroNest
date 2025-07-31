import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stack, 
  Alert,
  Divider,
  IconButton,
  InputAdornment
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock,
  Google as GoogleIcon,
  Facebook as FacebookIcon 
} from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // API call to backend
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store authentication data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.name);
        
        // Redirect to intended page or home
      if (response.ok) {
        alert('Logged in successfully!');
        navigate('/', { replace: true });
      }
      } else {
        setErrors({ submit: data.error || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Login with ${provider}`);
  };

  return (
    <Box sx={{ 
      bgcolor: '#fcfcff', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      py: 4,
      px: 2
    }}>
      <Paper elevation={0} sx={{
        p: 4,
        borderRadius: 4,
        bgcolor: '#fff',
        boxShadow: '0 8px 32px rgba(80,80,120,0.12)',
        border: '1.5px solid #e0e0e0',
        width: '100%',
        maxWidth: 440,
      }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button
            startIcon={<FavoriteBorderIcon />}
            sx={{
              bgcolor: '#ede7f6',
              color: '#7c4dff',
              borderRadius: 8,
              px: 3,
              py: 1,
              mb: 2,
              fontWeight: 500,
              fontSize: '0.9rem',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#d1c4e9' },
            }}
            disableElevation
          >
            {t('auth.welcomeBack')}
          </Button>
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            fontFamily: 'Poppins', 
            color: '#222',
            mb: 1
          }}>
            {t('auth.signInTitle')}
          </Typography>
          <Typography sx={{ 
            color: '#757575', 
            fontFamily: 'Poppins',
            fontSize: '1rem'
          }}>
            {t('auth.signInSubtitle')}
          </Typography>
        </Box>

        {/* Error Alert */}
        {errors.submit && (
          <Alert severity="error" sx={{ mb: 3, fontFamily: 'Poppins' }}>
            {errors.submit}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              name="email"
              type="email"
              label={t('auth.email')}
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#9575cd', fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: { fontFamily: 'Poppins' }
              }}
              InputLabelProps={{
                sx: { fontFamily: 'Poppins' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  '&:hover fieldset': {
                    borderColor: '#9575cd',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9575cd',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              label={t('auth.password')}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#9575cd', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { fontFamily: 'Poppins' }
              }}
              InputLabelProps={{
                sx: { fontFamily: 'Poppins' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  '&:hover fieldset': {
                    borderColor: '#9575cd',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9575cd',
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                bgcolor: '#9575cd',
                color: '#fff',
                fontFamily: 'Poppins',
                fontWeight: 600,
                borderRadius: 3,
                py: 1.5,
                fontSize: '1.1rem',
                boxShadow: 'none',
                '&:hover': { 
                  bgcolor: '#7e57c2',
                  boxShadow: '0 4px 12px rgba(149, 117, 205, 0.3)'
                },
                '&:disabled': {
                  bgcolor: '#e0e0e0'
                }
              }}
            >
              {loading ? t('auth.signingIn') : t('auth.signInButton')}
            </Button>
          </Stack>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3, fontFamily: 'Poppins', color: '#757575' }}>
          {t('auth.orContinueWith')}
        </Divider>

        {/* Social Login */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => handleSocialLogin('Google')}
            sx={{
              borderColor: '#e0e0e0',
              color: '#757575',
              fontFamily: 'Poppins',
              fontWeight: 500,
              borderRadius: 3,
              py: 1.2,
              '&:hover': {
                bgcolor: '#f5f5f5',
                borderColor: '#9575cd'
              }
            }}
          >
            {t('auth.google')}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FacebookIcon />}
            onClick={() => handleSocialLogin('Facebook')}
            sx={{
              borderColor: '#e0e0e0',
              color: '#757575',
              fontFamily: 'Poppins',
              fontWeight: 500,
              borderRadius: 3,
              py: 1.2,
              '&:hover': {
                bgcolor: '#f5f5f5',
                borderColor: '#9575cd'
              }
            }}
          >
            {t('auth.facebook')}
          </Button>
        </Stack>

        {/* Sign Up Link */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography sx={{ color: '#757575', fontFamily: 'Poppins' }}>
            {t('auth.dontHaveAccount')}{' '}
            <Link 
              to="/signup"
              style={{ 
                color: '#9575cd', 
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              {t('auth.signUpButton')}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
