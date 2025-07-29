import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Button, Stack, Chip } from "@mui/material";
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useTranslation } from 'react-i18next';

const YourComponent = () => {
  const { t } = useTranslation();
  
  // Now replace hardcoded text like:
  // "Welcome to NeuroNest" → {t('home.welcome')}
  // "Get Started" → {t('home.getStarted')}
  // etc.
}
const assessments = [
  {
    title: 'Memory Games',
    icon: <PsychologyIcon sx={{ color: '#9575cd', fontSize: 32 }} />,
    color: '#ede7f6',
    time: '5-10 minutes',
    difficulty: 'Easy',
    description: 'Remember sequences, patterns, and word lists in a gentle, game-like format.',
    buttonColor: '#9575cd',
  },
  {
    title: 'Focus Exercises',
    icon: <VisibilityIcon sx={{ color: '#90caf9', fontSize: 32 }} />,
    color: '#e3f2fd',
    time: '3-7 minutes',
    difficulty: 'Easy',
    description: 'Focus exercises that help measure concentration and attention span.',
    buttonColor: '#90caf9',
  },
  {
    title: 'Word Activities',
    icon: <AutoStoriesIcon sx={{ color: '#81c784', fontSize: 32 }} />,
    color: '#e8f5e9',
    time: '4-8 minutes',
    difficulty: 'Easy',
    description: 'Fun word-based activities to stimulate language and recall skills.',
    buttonColor: '#81c784',
  },
  {
    title: 'Visual Puzzles',
    icon: <ExtensionIcon sx={{ color: '#ffd54f', fontSize: 32 }} />,
    color: '#fffde7',
    time: '5-9 minutes',
    difficulty: 'Easy',
    description: 'Visual puzzles and patterns to challenge your problem-solving skills.',
    buttonColor: '#ffd54f',
  },
];


const CognitiveAssessments = () => {
  return (
    <Box sx={{ bgcolor: '#fcfcff', minHeight: '100vh', py: 6, px: 0, width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
      <Typography variant="h2" sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', textAlign: 'center', mb: 1 }}>
        Cognitive Assessments
      </Typography>
      <Typography variant="h5" sx={{ color: '#9575cd', fontWeight: 500, fontFamily: 'Poppins', textAlign: 'center', mb: 1 }}>
        Gentle exercises to keep your mind sharp
      </Typography>
      <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins', textAlign: 'center', mb: 5, fontSize: '1.15rem', maxWidth: 700, mx: 'auto' }}>
        These friendly activities help us understand how you're doing. Take your time and don't worry about getting everything perfect.
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', m: 0 }}>
        {assessments.map((a, idx) => (
          <Grid item xs={12} md={6} key={a.title} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={0} sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: a.color,
              boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
              border: '1.5px solid #e0e0e0',
              mb: 2,
              minHeight: 210,
              width: '90%',
              maxWidth: 540,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transition: 'box-shadow 0.3s, transform 0.3s',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(80,80,120,0.13)',
                transform: 'translateY(-3px) scale(1.02)',
              },
            }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {a.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontFamily: 'Poppins', color: a.buttonColor, fontSize: '1.15rem' }}>{a.title}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#b0b0b0' }} />
                    <Typography sx={{ color: '#b0b0b0', fontSize: '0.95rem', fontFamily: 'Poppins' }}>{a.time}</Typography>
                    <Chip label={a.difficulty} size="small" sx={{ ml: 1, bgcolor: '#f3e5f5', color: '#9575cd', fontWeight: 600, fontFamily: 'Poppins', fontSize: '0.85rem' }} />
                  </Stack>
                </Box>
              </Stack>
              <Typography sx={{ color: '#757575', fontFamily: 'Poppins', fontSize: '1rem', mb: 2, mt: 1 }}>
                {a.description}
              </Typography>
              <Button variant="contained" startIcon={<span style={{ fontSize: 18 }}>▶</span>} sx={{
                bgcolor: a.buttonColor,
                color: '#fff',
                fontFamily: 'Poppins',
                fontWeight: 600,
                borderRadius: 2,
                fontSize: '1.05rem',
                px: 3,
                py: 1.2,
                alignSelf: 'flex-start',
                boxShadow: 'none',
                '&:hover': { bgcolor: a.buttonColor, opacity: 0.93 },
              }}>
                Start Assessment
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CognitiveAssessments;
