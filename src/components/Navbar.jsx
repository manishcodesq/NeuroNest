import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import LanguageIcon from '@mui/icons-material/Language';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PsychologyIcon from '@mui/icons-material/Psychology';

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Cognitive Assessments", to: "/assessments" },
  { label: "Voice Analysis", to: "/voice" },
  { label: "Smart Dashboard", to: "/dashboard" },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <AppBar position="static" elevation={0} sx={{ background: "#fff", color: "#222", borderBottom: "1.5px solid #ede7f6", width: '100%', left: 0, position: 'relative', boxSizing: 'border-box' }}>
      <Toolbar sx={{ py: 2, width: '100%', minWidth: 0, px: { xs: 1, sm: 3, md: 6 }, boxSizing: 'border-box' }}>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <Box sx={{ bgcolor: '#ede7f6', borderRadius: 2, p: 1, mr: 1 }}>
            <PsychologyIcon sx={{ color: '#7c4dff', fontSize: 32 }} />
          </Box>
          <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#222', letterSpacing: 0 }}>
            NeuroNest
          </Typography>
        </Box>
        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || (link.to === '/' && location.pathname === '/');
            // Capitalize only the first letter of each word
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
        {/* Right-side icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button sx={{ minWidth: 0, p: 1, borderRadius: 2, color: '#7c4dff', bgcolor: '#ede7f6', mr: 1, fontFamily: 'Poppins' }}>
            <LanguageIcon />
          </Button>
          <Button sx={{ minWidth: 0, p: 1, borderRadius: 2, color: '#7c4dff', bgcolor: '#ede7f6', fontFamily: 'Poppins' }}>
            <AccessibilityNewIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 