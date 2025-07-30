import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  InputAdornment,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock,
  Person,
  Google as GoogleIcon,
  Facebook as FacebookIcon 
} from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import router from "../../ml-services/routes/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
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
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
        // Simulate API call
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        }),
      });

      const data = await response.json();

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
      
      // Redirect to home page
      if (data) {
        navigate('/', { replace: true });
      }
      
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    // Implement social signup logic here
    console.log(`Sign up with ${provider}`);
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
            Join NeuroNest
          </Button>
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            fontFamily: 'Poppins', 
            color: '#222',
            mb: 1
          }}>
            Create Your Account
          </Typography>
          <Typography sx={{ 
            color: '#757575', 
            fontFamily: 'Poppins',
            fontSize: '1rem'
          }}>
            Start your cognitive health journey today
          </Typography>
        </Box>

        {/* Error Alert */}
        {errors.submit && (
          <Alert severity="error" sx={{ mb: 3, fontFamily: 'Poppins' }}>
            {errors.submit}
          </Alert>
        )}

        {/* Signup Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#9575cd', fontSize: 20 }} />
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
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
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
            </Stack>

            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email Address"
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
              label="Password"
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

            <TextField
              fullWidth
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#9575cd', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  sx={{
                    color: '#9575cd',
                    '&.Mui-checked': {
                      color: '#9575cd',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontFamily: 'Poppins', fontSize: '0.9rem' }}>
                  I agree to the{' '}
                  <Link to="/terms" style={{ color: '#9575cd', textDecoration: 'none' }}>
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" style={{ color: '#9575cd', textDecoration: 'none' }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
            {errors.agreeToTerms && (
              <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', fontFamily: 'Poppins' }}>
                {errors.agreeToTerms}
              </Typography>
            )}

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
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Stack>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3, fontFamily: 'Poppins', color: '#757575' }}>
          or sign up with
        </Divider>

        {/* Social Signup */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => handleSocialSignup('Google')}
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
            Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FacebookIcon />}
            onClick={() => handleSocialSignup('Facebook')}
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
            Facebook
          </Button>
        </Stack>

        {/* Login Link */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography sx={{ color: '#757575', fontFamily: 'Poppins' }}>
            Already have an account?{' '}
            <Link 
              to="/login"
              style={{ 
                color: '#9575cd', 
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
