import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const MEtips = t('generalCognitiveSkills.MentalExe.tips', {
    returnObjects: true
  });

  const PHtips = t('generalCognitiveSkills.PhysicalHealth.tips', {
    returnObjects: true
  });

  const LTtips = t('generalCognitiveSkills.LearningTechniques.tips', {
    returnObjects: true
  });

  const MFtips = t('generalCognitiveSkills.MindfulnessFocus.tips', {
    returnObjects: true
  });

  const NStips = t('generalCognitiveSkills.NutritionSupplements.tips', {
    returnObjects: true
  });

  const LHtips = t('generalCognitiveSkills.LifestyleHabits.tips', {
    returnObjects: true
  });



  return (
    <Box sx={{ bgcolor: '#fcfcff', minHeight: '100vh', pb: 8, width: '100vw',
      position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}
    >

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
          {t('home.aiPoweredCare')}
        </Button>
        <Typography variant="h2" sx={{ fontWeight: 700, fontFamily: 'Poppins',
          mb: 1, color: '#222' }}>
          {t('home.welcome')}
        </Typography>
        <Typography variant="h5" sx={{ color: '#9575cd', fontWeight: 500, mb: 2,
          fontFamily: 'Poppins' }}>
          {t('home.subtitle')}
        </Typography>
        <Typography sx={{ color: '#757575', maxWidth: 700, mx: 'auto', mb: 4,
          fontSize: '1.2rem', fontFamily: 'Poppins' }}>
          {t('home.description')}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button 
            variant="contained" 
            size="large"
            sx={{ bgcolor: '#9575cd', fontWeight: 600, fontFamily: 'Poppins',
              px: 4, py: 1.5, borderRadius: 3, fontSize: '1.1rem',
              '&:hover': { bgcolor: '#7e57c2' }
            }}
            onClick={() => navigate('/cognitive-assessment')}
          >
            {t('home.getStarted')}
          </Button>
          <Button 
            variant="outlined" size="large" 
            sx={{ fontWeight: 600, fontFamily: 'Poppins', px: 4, py: 1.5,
              borderRadius: 3, fontSize: '1.1rem', bgcolor: '#fff',
              borderColor: '#9575cd', color: '#222',
              '&:hover': { bgcolor: '#ede7f6' }
            }}
            onClick={() => navigate('/dashboard')}
          >
            {t('home.viewDashboard')}
          </Button>
        </Stack>
      </Box>

      {/* How We Care Section */}
      <Box sx={{ pt: 6, pb: 4, textAlign: 'center', width: '100%' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 1,
          color: '#222' }}>
          {t('home.howWeCare')}
        </Typography>
        <Typography sx={{ color: '#757575', maxWidth: 700, mx: 'auto', mb: 4,
          fontSize: '1.1rem', fontFamily: 'Poppins' }}>
          {t('home.howWeCareDesc')}
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
              <Box sx={{ bgcolor: '#ede7f6', borderRadius: 2, p: 1.2, mb: 1.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PsychologyIcon sx={{ fontSize: 32, color: '#9575cd' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                {t('home.cognitiveAssessments')}
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                {t('home.cognitiveAssessmentsDesc')}
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
              <Box sx={{ bgcolor: '#e3f2fd', borderRadius: 2, p: 1.2, mb: 1.5,
               display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MicIcon sx={{ fontSize: 32, color: '#90caf9' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                {t('home.voiceAnalysis')}
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                {t('home.voiceAnalysisDesc')}
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
              <Box sx={{ bgcolor: '#e8f5e9', borderRadius: 2, p: 1.2, mb: 1.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <InsightsIcon sx={{ fontSize: 32, color: '#81c784' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                {t('home.smartInsights')}
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                {t('home.smartInsightsDesc')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Memory Improvement Section */}
      <Box sx={{ pt: 6, pb: 4, textAlign: 'center', width: '100%' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 1,
          color: '#222' }}>
          {t('generalCognitiveSkills.title')}
        </Typography>
        <Typography sx={{ color: '#757575', maxWidth: 700, mx: 'auto', mb: 4,
          fontSize: '1.1rem', fontFamily: 'Poppins' }}>
          {t('generalCognitiveSkills.description')}
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          
          {/* Mental Exercises Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #ede7f6',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px)',
              },
              display: 'flex', flexDirection: 'column',
              minWidth: 0,
              maxWidth: 380,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#ede7f6', borderRadius: 2, p: 1.2, mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                alignSelf: 'center' }}>
                <PsychologyIcon sx={{ fontSize: 32, color: '#9575cd' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 2, color: '#9575cd', textAlign: 'left', fontSize: '1.1rem' }}>
                1. {t('generalCognitiveSkills.MentalExe.title')}
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                {MEtips.map((tip, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: '#9575cd', 
                      mr: 1.5, 
                      mt: 0.75,
                      flexShrink: 0 
                    }} />
                    <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                      fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Physical Health Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e8f5e9',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px)',
              },
              display: 'flex', flexDirection: 'column',
              minWidth: 0,
              maxWidth: 380,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#e8f5e9', borderRadius: 2, p: 1.2, mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                alignSelf: 'center' }}>
                <FavoriteBorderIcon sx={{ fontSize: 32, color: '#81c784' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 2, color: '#9575cd', textAlign: 'left', fontSize: '1.1rem' }}>
                2. {t('generalCognitiveSkills.PhysicalHealth.title')}
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                {PHtips.map((tip, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: '#9575cd', 
                      mr: 1.5, 
                      mt: 0.75,
                      flexShrink: 0 
                    }} />
                    <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                      fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Learning Techniques Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e3f2fd',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px)',
              },
              display: 'flex', flexDirection: 'column',
              minWidth: 0,
              maxWidth: 380,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#e3f2fd', borderRadius: 2, p: 1.2, mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                alignSelf: 'center' }}>
                <InsightsIcon sx={{ fontSize: 32, color: '#90caf9' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 2, color: '#9575cd', textAlign: 'left', fontSize: '1.1rem' }}>
                3. {t('generalCognitiveSkills.LearningTechniques.title')}
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                {LTtips.map((tip, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: '#9575cd', 
                      mr: 1.5, 
                      mt: 0.75,
                      flexShrink: 0 
                    }} />
                    <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                      fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Mindfulness & Focus Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #fff3e0',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px)',
              },
              display: 'flex', flexDirection: 'column',
              minWidth: 0,
              maxWidth: 380,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#fff3e0', borderRadius: 2, p: 1.2, mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                alignSelf: 'center' }}>
                <PsychologyIcon sx={{ fontSize: 32, color: '#ffb74d' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 2, color: '#9575cd', textAlign: 'left', fontSize: '1.1rem' }}>
                4. {t('generalCognitiveSkills.MindfulnessFocus.title')}
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                {MFtips.map((tip, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: '#9575cd', 
                      mr: 1.5, 
                      mt: 0.75,
                      flexShrink: 0 
                    }} />
                    <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                      fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Nutrition & Supplements Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #fce4ec',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px)',
              },
              display: 'flex', flexDirection: 'column',
              minWidth: 0,
              maxWidth: 380,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#fce4ec', borderRadius: 2, p: 1.2, mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                alignSelf: 'center' }}>
                <FavoriteBorderIcon sx={{ fontSize: 32, color: '#f06292' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 2, color: '#9575cd', textAlign: 'left', fontSize: '1.1rem' }}>
                5. {t('generalCognitiveSkills.NutritionSupplements.title')}
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                {NStips.map((tip, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: '#9575cd', 
                      mr: 1.5, 
                      mt: 0.75,
                      flexShrink: 0 
                    }} />
                    <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                      fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Lifestyle Habits Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #f3e5f5',
              bgcolor: '#fff',
              height: '100%',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: '0 1px 4px rgba(80,80,120,0.04)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(80,80,120,0.10)',
                transform: 'translateY(-4px)',
              },
              display: 'flex', flexDirection: 'column',
              minWidth: 0,
              maxWidth: 380,
              mx: 'auto',
            }}>
              <Box sx={{ bgcolor: '#f3e5f5', borderRadius: 2, p: 1.2, mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                alignSelf: 'center' }}>
                <GroupsIcon sx={{ fontSize: 32, color: '#ba68c8' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 2, color: '#9575cd', textAlign: 'left', fontSize: '1.1rem' }}>
                6. {t('generalCognitiveSkills.LifestyleHabits.title')}
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                {LHtips.map((tip, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: '#9575cd', 
                      mr: 1.5, 
                      mt: 0.75,
                      flexShrink: 0 
                    }} />
                    <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                      fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

        </Grid>

        {/* Pro Tips Card */}
        <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
          <Paper elevation={0} sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #9575cd 0%, #ba68c8 100%)',
            color: 'white',
            textAlign: 'center',
            transition: 'box-shadow 0.3s, transform 0.3s',
            '&:hover': {
              boxShadow: '0 12px 32px rgba(149, 117, 205, 0.3)',
              transform: 'translateY(-2px)',
            },
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 32, mr: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'Poppins' }}>
                7. {t('generalCognitiveSkills.proTitle')}
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '1.1rem', lineHeight: 1.7,
              opacity: 0.95 }}>
                {t('generalCognitiveSkills.proTips')}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Perks Section */}
      <Box sx={{ pt: 6, pb: 4, textAlign: 'center', width: '100%' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Poppins',
          mb: 1, color: '#222' }}>
          {t('home.perksTitle')}
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
              <Box sx={{ bgcolor: '#e8f5e9', borderRadius: 2, p: 1.2, mb: 1.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldOutlinedIcon sx={{ fontSize: 32, color: '#81c784' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                {t('home.securePrivate')}
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                {t('home.securePrivateDesc')}
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
              <Box sx={{ bgcolor: '#ede7f6', borderRadius: 2, p: 1.2, mb: 1.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 32, color: '#9575cd' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                {t('home.scientificallyValidated')}
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                {t('home.scientificallyValidatedDesc')}
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
              <Box sx={{ bgcolor: '#fffde7', borderRadius: 2, p: 1.2, mb: 1.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GroupsIcon sx={{ fontSize: 32, color: '#ffd54f' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins',
                mb: 0.5, color: '#222', textAlign: 'center', fontSize: '1.15rem' }}>
                {t('home.familyCentered')}
              </Typography>
              <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins',
                fontWeight: 500, textAlign: 'center', fontSize: '1rem' }}>
                {t('home.familyCenteredDesc')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Contact Us Section */}
      <Box sx={{ pt: 8, textAlign: 'center', width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'Poppins', mb: 2,
          color: '#222' }}>
          {t('home.contactUs')}
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <Button startIcon={<PhoneIcon />} sx={{ color: '#9575cd', fontSize: '1.1rem',
            fontFamily: 'Poppins', textTransform: 'none' }} href="tel:8275823714">
            8275823714
          </Button>
          <Button startIcon={<EmailIcon />} sx={{ color: '#9575cd', fontSize: '1.1rem',
            fontFamily: 'Poppins', textTransform: 'none' }} href="mailto:neuronest@example.com">
            neuronest@gmail.com
          </Button>
        </Stack>
      </Box>

    </Box>
  );
};

export default Home;
