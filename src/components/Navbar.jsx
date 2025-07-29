import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TranslateIcon from '@mui/icons-material/Translate';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [langMenuAnchor, setLangMenuAnchor] = useState(null);
  
  // Authentication state
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  // Get current language
  const currentLanguage = i18n.language || 'en';

  // Language options
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
  ];

  // Updated nav links with translations
  const navLinks = [
    { label: t('navbar.home'), to: "/" },
    { label: t('navbar.cognitiveAssessments'), to: "/cognitive-assessment" },
    { label: t('navbar.voiceAnalysis'), to: "/voice" },
    // Dashboard only shown if authenticated
    ...(isAuthenticated ? [{ label: t('navbar.smartDashboard'), to: "/dashboard" }] : []),
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangMenuOpen = (event) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangMenuAnchor(null);
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    handleLangMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    handleMenuClose();
    navigate('/');
  };

  const getCurrentLanguageDisplay = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.nativeName : 'English';
  };

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        background: "#fff", 
        color: "#222", 
        borderBottom: "1.5px solid #ede7f6", 
        width: '100%', 
        left: 0, 
        position: 'relative', 
        boxSizing: 'border-box' 
      }}
    >
      <Toolbar sx={{ 
        py: 1,
        width: '100%', 
        minWidth: 0, 
        px: { xs: 2, sm: 3, md: 4 },
        boxSizing: 'border-box' 
      }}>
        {/* Logo and Brand */}
        <Typography 
          variant="h6" 
          component={Link}
          to="/"
          sx={{ 
            fontFamily: 'Poppins', 
            fontWeight: 700, 
            color: '#9575cd',
            letterSpacing: 0,
            textDecoration: 'none',
            mr: 3,
            '&:hover': {
              color: '#7c4dff'
            }
          }}
        >
          {t('navbar.brand')}
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || (link.to === '/' && location.pathname === '/');
            return (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                sx={{
                  fontFamily: 'Poppins',
                  color: isActive ? '#fff' : '#222',
                  fontWeight: 500,
                  borderRadius: 3,
                  px: 2,
                  py: 0.8,
                  background: isActive ? '#9575cd' : 'transparent',
                  boxShadow: isActive ? '0 2px 8px #ede7f6' : 'none',
                  textTransform: 'none',
                  fontSize: '1rem',
                  letterSpacing: 0,
                  '&:hover': {
                    background: isActive ? '#7e57c2' : '#f3e5f5',
                  },
                  transition: 'background 0.2s',
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>

        {/* Right-side content */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Language Toggle Button */}
          <Button
            onClick={handleLangMenuOpen}
            startIcon={<TranslateIcon />}
            sx={{
              color: '#9575cd',
              fontFamily: 'Poppins',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: 3,
              px: 2,
              py: 0.8,
              border: '1px solid #ede7f6',
              '&:hover': {
                bgcolor: '#ede7f6',
                borderColor: '#9575cd'
              }
            }}
          >
            {getCurrentLanguageDisplay()}
          </Button>

          {/* Language Menu */}
          <Menu
            anchorEl={langMenuAnchor}
            open={Boolean(langMenuAnchor)}
            onClose={handleLangMenuClose}
            sx={{
              mt: 1,
              '& .MuiPaper-root': {
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(80,80,120,0.12)',
                border: '1px solid #e0e0e0',
                minWidth: 150
              }
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {languages.map((language) => (
              <MenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                selected={currentLanguage === language.code}
                sx={{
                  fontFamily: 'Poppins',
                  '&:hover': {
                    bgcolor: '#ede7f6'
                  },
                  '&.Mui-selected': {
                    bgcolor: '#ede7f6',
                    color: '#9575cd',
                    fontWeight: 600
                  }
                }}
              >
                {language.nativeName}
              </MenuItem>
            ))}
          </Menu>

          {/* Authentication section */}
          {isAuthenticated ? (
            <>
              {/* User Avatar and Menu */}
              <IconButton 
                onClick={handleMenuOpen}
                sx={{
                  '&:hover': {
                    bgcolor: '#ede7f6'
                  }
                }}
              >
                <Avatar sx={{ bgcolor: '#9575cd', width: 32, height: 32 }}>
                  {userName ? userName.charAt(0).toUpperCase() : <AccountCircleIcon />}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ 
                  mt: 1,
                  '& .MuiPaper-root': {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(80,80,120,0.12)',
                    border: '1px solid #e0e0e0',
                    minWidth: 200
                  }
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography sx={{ 
                    fontWeight: 600, 
                    fontFamily: 'Poppins',
                    color: '#222'
                  }}>
                    {userName || 'User'}
                  </Typography>
                  <Typography sx={{ 
                    fontSize: '0.9rem', 
                    color: '#757575', 
                    fontFamily: 'Poppins' 
                  }}>
                    {userEmail}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem 
                  onClick={() => {
                    handleMenuClose();
                    navigate('/dashboard');
                  }}
                  sx={{ 
                    color: '#222',
                    fontFamily: 'Poppins',
                    '&:hover': {
                      bgcolor: '#ede7f6'
                    }
                  }}
                >
                  <DashboardIcon sx={{ mr: 1, fontSize: 20, color: '#9575cd' }} />
                  {t('navbar.dashboard')}
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout} 
                  sx={{ 
                    color: '#f44336',
                    fontFamily: 'Poppins',
                    '&:hover': {
                      bgcolor: '#ffebee'
                    }
                  }}
                >
                  <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                  {t('navbar.logout')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Sign In and Sign Up buttons */}
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: '#9575cd',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 3,
                  px: 2,
                  py: 0.8,
                  '&:hover': { 
                    bgcolor: '#ede7f6' 
                  }
                }}
              >
                {t('navbar.signIn')}
              </Button>
              
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  bgcolor: '#9575cd',
                  color: '#fff',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 3,
                  px: 2.5,
                  py: 0.8,
                  boxShadow: 'none',
                  '&:hover': { 
                    bgcolor: '#7e57c2',
                    boxShadow: '0 4px 12px rgba(149, 117, 205, 0.3)'
                  }
                }}
              >
                {t('navbar.signUp')}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
