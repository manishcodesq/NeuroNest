import React from "react";
import { Box, Typography, Button, Grid, Paper, Stack } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MicIcon from '@mui/icons-material/Mic';
import InsightsIcon from '@mui/icons-material/Insights';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Home = () => {
  return (
    <Box sx={{ bgcolor: '#fcfcff', minHeight: '100vh', pb: 8, width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
      {/* Hero Section */}
      <Box sx={{ pt: 8, pb: 6, textAlign: 'center', width: '100%' }}>
        <Button
          startIcon={<FavoriteBorderIcon />}
          sx={{
            bgcolor: '#ede7f6',
            color: '#7c4dff',
            borderRadius: 8,
            px: 3,
            py: 1,
            mb: 3,
            fontWeight: 500,
            fontSize: '1rem',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#d1c4e9' },
          }}
          disableElevation
        >
          AI-Powered Cognitive Care
        </Button>
        <Typography variant="h2" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 1, color: '#222' }}>
          Welcome to NeuroNest
        </Typography>
        <Typography variant="h5" sx={{ color: '#9575cd', fontWeight: 500, mb: 2, fontFamily: 'Poppins' }}>
          Nurturing minds, caring hearts <span role="img" aria-label="blue heart">💙</span>
        </Typography>
        <Typography sx={{ color: '#757575', maxWidth: 700, mx: 'auto', mb: 4, fontSize: '1.2rem', fontFamily: 'Poppins' }}>
          Our AI-powered platform provides gentle, comprehensive cognitive assessments designed specifically for elderly users. We help detect early signs of dementia with care, compassion, and cutting-edge technology.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button variant="contained" size="large" sx={{ bgcolor: '#9575cd', fontWeight: 600, fontFamily: 'Poppins', px: 4, py: 1.5, borderRadius: 3, fontSize: '1.1rem', '&:hover': { bgcolor: '#7e57c2' } }}>
            Get Started
          </Button>
          <Button variant="outlined" size="large" sx={{ fontWeight: 600, fontFamily: 'Poppins', px: 4, py: 1.5, borderRadius: 3, fontSize: '1.1rem', bgcolor: '#fff', borderColor: '#9575cd', color: '#222', '&:hover': { bgcolor: '#ede7f6' } }}>
            View Dashboard
          </Button>
        </Stack>
      </Box>

      {/* How We Care Section */}
      <Box sx={{ pt: 6, pb: 4, textAlign: 'center', width: '100%' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 1, color: '#222' }}>
          How We Care for You
        </Typography>
        <Typography sx={{ color: '#757575', maxWidth: 700, mx: 'auto', mb: 4, fontSize: '1.1rem', fontFamily: 'Poppins' }}>
          Our platform is designed with love and care specifically for elderly users and their families.
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #ede7f6',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px) scale(1.03)',
              },
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 0,
              maxWidth: 340,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#ede7f6', borderRadius: 2, p: 1.2, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PsychologyIcon sx={{ fontSize: 32, color: '#9575cd' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                Cognitive Assessments
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins', fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                Gentle daily tasks that feel like friendly games, designed to monitor your cognitive health.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #e3f2fd',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px) scale(1.03)',
              },
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 0,
              maxWidth: 340,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#e3f2fd', borderRadius: 2, p: 1.2, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MicIcon sx={{ fontSize: 32, color: '#90caf9' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                Voice Analysis
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins', fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                Simple voice recordings help us track patterns and changes in your speech over time.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #e8f5e9',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px) scale(1.03)',
              },
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 0,
              maxWidth: 340,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#e8f5e9', borderRadius: 2, p: 1.2, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <InsightsIcon sx={{ fontSize: 32, color: '#81c784' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                Smart Insights
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins', fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                Easy-to-understand reports that you can share with your loved ones and healthcare providers.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Perks Section */}
      <Box sx={{ pt: 6, pb: 4, textAlign: 'center', width: '100%' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 1, color: '#222' }}>
          Perks of using NeuroNest
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #e8f5e9',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px) scale(1.03)',
              },
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 0,
              maxWidth: 340,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#e8f5e9', borderRadius: 2, p: 1.2, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldOutlinedIcon sx={{ fontSize: 32, color: '#81c784' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                Secure & Private
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins', fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                Your health data is protected with enterprise-grade security and never shared without your consent.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #ede7f6',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px) scale(1.03)',
              },
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 0,
              maxWidth: 340,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#ede7f6', borderRadius: 2, p: 1.2, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 32, color: '#90caf9' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                Scientifically Validated
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins', fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                Our assessments are based on proven cognitive science research and medical guidelines.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #fffde7',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px) scale(1.03)',
              },
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 0,
              maxWidth: 340,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#fffde7', borderRadius: 2, p: 1.2, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GroupsIcon sx={{ fontSize: 32, color: '#ffd54f' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                Family Centered
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins', fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                Easily share results with family members and healthcare providers for comprehensive care.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Contact Us Section */}
      <Box sx={{ pt: 8, textAlign: 'center', width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 2, color: '#222' }}>
          Contact Us
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <Button startIcon={<PhoneIcon />} sx={{ color: '#9575cd', fontSize: '1.1rem', fontFamily: 'Poppins', textTransform: 'none' }} href="tel:8275823714">
            8275823714
          </Button>
          <Button startIcon={<EmailIcon />} sx={{ color: '#9575cd', fontSize: '1.1rem', fontFamily: 'Poppins', textTransform: 'none' }} href="mailto:neuronest@example.com">
            neuronest@gmail.com
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home; 