import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  Divider
} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Authentication state
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  // Updated nav links - some routes should be protected
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Cognitive Assessments", to: "/cognitive-assessment" }, // Updated route
    { label: "Voice Analysis", to: "/voice" },
    // Dashboard only shown if authenticated
    ...(isAuthenticated ? [{ label: "Smart Dashboard", to: "/dashboard" }] : []),
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    handleMenuClose();
    navigate('/');
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
        py: 2, 
        width: '100%', 
        minWidth: 0, 
        px: { xs: 1, sm: 3, md: 6 }, 
        boxSizing: 'border-box' 
      }}>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <Box sx={{ bgcolor: '#ede7f6', borderRadius: 2, p: 1, mr: 1 }}>
            <PsychologyIcon sx={{ color: '#7c4dff', fontSize: 32 }} />
          </Box>
          <Typography 
            variant="h6" 
            component={Link}
            to="/"
            sx={{ 
              fontFamily: 'Poppins', 
              fontWeight: 700, 
              color: '#222', 
              letterSpacing: 0,
              textDecoration: 'none',
              '&:hover': {
                color: '#7c4dff'
              }
            }}
          >
            NeuroNest
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || (link.to === '/' && location.pathname === '/');
            const label = link.label.replace(/\b\w/g, c => c.toUpperCase()).replace(/\B\w/g, c => c.toLowerCase());
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
                  px: 3,
                  py: 1,
                  background: isActive ? '#9575cd' : 'transparent',
                  boxShadow: isActive ? '0 2px 8px #ede7f6' : 'none',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  letterSpacing: 0,
                  '&:hover': {
                    background: isActive ? '#7e57c2' : '#f3e5f5',
                  },
                  transition: 'background 0.2s',
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        {/* Right-side content */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Language and Accessibility buttons */}
          <Button sx={{ 
            minWidth: 0, 
            p: 1, 
            borderRadius: 2, 
            color: '#7c4dff', 
            bgcolor: '#ede7f6', 
            mr: 1, 
            fontFamily: 'Poppins',
            '&:hover': {
              bgcolor: '#d1c4e9'
            }
          }}>
            <LanguageIcon />
          </Button>
          <Button sx={{ 
            minWidth: 0, 
            p: 1, 
            borderRadius: 2, 
            color: '#7c4dff', 
            bgcolor: '#ede7f6', 
            mr: 2, 
            fontFamily: 'Poppins',
            '&:hover': {
              bgcolor: '#d1c4e9'
            }
          }}>
            <AccessibilityNewIcon />
          </Button>

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
                  Dashboard
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
                  Logout
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
                  '&:hover': { 
                    bgcolor: '#ede7f6' 
                  }
                }}
              >
                Sign In
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
                  px: 3,
                  boxShadow: 'none',
                  '&:hover': { 
                    bgcolor: '#7e57c2',
                    boxShadow: '0 4px 12px rgba(149, 117, 205, 0.3)'
                  }
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
