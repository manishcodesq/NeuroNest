import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Chip,
  Alert,
  CircularProgress
} from "@mui/material";
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ExtensionIcon from '@mui/icons-material/Extension';
import VideocamIcon from '@mui/icons-material/Videocam';
import StopIcon from '@mui/icons-material/Stop';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import FocusTimer from '../components/FocusTimer';
import MemoryGames from '../components/MemoryGames';
import VisualPuzzles from '../components/VisualPuzzles';
import WordActivities from '../components/WordActivities';
import useScreenRecorder from '../hooks/useScreenRecorder';
import { useTranslation } from 'react-i18next';



const assessments = [
  {
    title: 'Memory Games',
    icon: <PsychologyIcon sx={{ color: '#9575cd', fontSize: 32 }} />,
    color: '#ede7f6',
    time: '5-10 minutes',
    difficulty: 'Easy',
    description: 'Remember sequences, patterns, and word lists in a gentle, game-like format.',
    buttonColor: '#9575cd',
    componentKey: 'memoryGames',
  },
  {
    title: 'Focus Exercises',
    icon: <VisibilityIcon sx={{ color: '#90caf9', fontSize: 32 }} />,
    color: '#e3f2fd',
    time: '3-7 minutes',
    difficulty: 'Easy',
    description: 'Focus exercises that help measure concentration and attention span.',
    buttonColor: '#90caf9',
    componentKey: 'focusTimer',
  },
  {
    title: 'Word Activities',
    icon: <AutoStoriesIcon sx={{ color: '#81c784', fontSize: 32 }} />,
    color: '#e8f5e9',
    time: '4-8 minutes',
    difficulty: 'Easy',
    description: 'Fun word-based activities to stimulate language and recall skills.',
    buttonColor: '#81c784',
    componentKey: 'wordActivities',
  },
  {
    title: 'Visual Puzzles',
    icon: <ExtensionIcon sx={{ color: '#ffd54f', fontSize: 32 }} />,
    color: '#fffde7',
    time: '5-9 minutes',
    difficulty: 'Easy',
    description: 'Visual puzzles and patterns to challenge your problem-solving skills.',
    buttonColor: '#ffd54f',
    componentKey: 'visualPuzzles',
  },
];

const CognitiveAssessments = () => {
  // State for which assessment component to show (null means show cards)
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [savingRecording, setSavingRecording] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const { t } = useTranslation();
  // Screen recording hook
  const {
    isRecording,
    recordingBlob,
    error,
    startRecording,
    stopRecording,
    saveRecording
  } = useScreenRecorder();

  // Handle start recording
  const handleStartRecording = async () => {
    setSaveMessage(null);
    try {
      await startRecording();
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  // Handle stop recording and auto-save
  const handleStopAndSaveRecording = async () => {
    setSavingRecording(true);
    setSaveMessage(null);
    
    // Stop recording first
    stopRecording();
    
    // Wait a moment for the recording to finalize
    setTimeout(async () => {
      try {
        // Get user ID from localStorage (or use anonymous)
        const userId = localStorage.getItem('userId') || 'anonymous';
        const result = await saveRecording(userId);
        
        if (result.success) {
          setSaveMessage({ type: 'success', text: 'Recording saved successfully!' });
        } else {
          setSaveMessage({ type: 'error', text: result.error || 'Failed to save recording' });
        }
      } catch (error) {
        setSaveMessage({ type: 'error', text: 'Error saving recording' });
      } finally {
        setSavingRecording(false);
      }
    }, 1000);
  };

  const renderAssessmentComponent = () => {
    switch (activeAssessment) {
      case 'focusTimer':
        return <FocusTimer />;
      case 'memoryGames':
        return <MemoryGames />;
      case 'wordActivities':
        return <WordActivities />;
      case 'visualPuzzles':
        return <VisualPuzzles />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#fcfcff',
        minHeight: '100vh',
        py: 6,
        px: 0,
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        fontFamily: 'Poppins',
      }}
    >
      {/* Recording Controls - Always visible at top right */}
      <Box sx={{ position: 'fixed', top: 80, right: 20, zIndex: 1000 }}>
        <Paper sx={{ 
          p: 2, 
          bgcolor: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <Stack direction="row" spacing={2} alignItems="center">
            {!isRecording ? (
              <>
                <VideocamIcon sx={{ color: '#9575cd', fontSize: 24 }} />
                <Typography sx={{ color: '#9575cd', fontWeight: 600, fontSize: '0.9rem' }}>
                  Ready to Record
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<FiberManualRecordIcon />}
                  sx={{ 
                    bgcolor: '#9575cd', 
                    '&:hover': { bgcolor: '#7e57c2' },
                    fontSize: '0.8rem'
                  }}
                  onClick={handleStartRecording}
                >
                  Start Recording
                </Button>
              </>
            ) : (
              <>
                <FiberManualRecordIcon sx={{ color: '#f44336', fontSize: 24 }} />
                <Typography sx={{ color: '#f44336', fontWeight: 600, fontSize: '0.9rem' }}>
                  Recording...
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={savingRecording ? <CircularProgress size={16} color="inherit" /> : <StopIcon />}
                  sx={{ 
                    bgcolor: '#f44336', 
                    '&:hover': { bgcolor: '#d32f2f' },
                    fontSize: '0.8rem'
                  }}
                  onClick={handleStopAndSaveRecording}
                  disabled={savingRecording}
                >
                  {savingRecording ? 'Saving...' : 'Stop & Save'}
                </Button>
              </>
            )}
          </Stack>
        </Paper>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, mx: 3 }}>
          {error}
        </Alert>
      )}

      {/* Save Message Alert */}
      {saveMessage && (
        <Alert severity={saveMessage.type} sx={{ mb: 3, mx: 3 }}>
          {saveMessage.text}
        </Alert>
      )}

      {activeAssessment ? (
        <>
          {/* Back button to assessment cards */}
          <Button
            variant="outlined"
            sx={{ mb: 3, ml: 3, fontWeight: 600 }}
            onClick={() => setActiveAssessment(null)}
          >
            ← Back to Assessments
          </Button>
          {/* Render selected assessment component */}
          {renderAssessmentComponent()}
        </>
      ) : (
        <>
          {/* Main assessments cards list */}
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, color: '#222', textAlign: 'center', mb: 1 }}
          >
            {t('cognitiveAssessments.title')}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: '#9575cd', fontWeight: 500, textAlign: 'center', mb: 1 }}
          >
            Gentle exercises to keep your mind sharp
          </Typography>
          <Typography
            sx={{
              color: '#90a4ae',
              textAlign: 'center',
              mb: 2,
              fontSize: '1.15rem',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            These friendly activities help us understand how you're doing. Take your time and
            don't worry about getting everything perfect.
          </Typography>

          {/* Recording Info */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography sx={{ 
              color: '#9575cd', 
              fontSize: '1rem', 
              fontWeight: 500,
              bgcolor: '#f3e5f5',
              px: 3,
              py: 1,
              borderRadius: 3,
              display: 'inline-block'
            }}>
              💡 Use the recording controls in the top-right corner to capture your assessment session
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', m: 0 }}>
            {assessments.map((a) => (
              <Grid
                item
                xs={12}
                md={6}
                key={a.title}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: a.color,
                    boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
                    border: '1.5px solid #e0e0e0',
                    mb: 2,
                    minHeight: 210,
                    width: '90%',
                    maxWidth: 540,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(80,80,120,0.13)',
                      transform: 'translateY(-3px) scale(1.02)',
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                    <Box
                      sx={{
                        bgcolor: '#fff',
                        borderRadius: 2,
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {a.icon}
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: a.buttonColor,
                          fontSize: '1.15rem',
                        }}
                      >
                        {a.title}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                        <AccessTimeIcon sx={{ fontSize: 18, color: '#b0b0b0' }} />
                        <Typography sx={{ color: '#b0b0b0', fontSize: '0.95rem' }}>
                          {a.time}
                        </Typography>
                        <Chip
                          label={a.difficulty}
                          size="small"
                          sx={{
                            ml: 1,
                            bgcolor: '#f3e5f5',
                            color: a.buttonColor,
                            fontWeight: 600,
                            fontSize: '0.85rem',
                          }}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                  <Typography sx={{ color: '#757575', fontSize: '1rem', mb: 2, mt: 1 }}>
                    {a.description}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<span style={{ fontSize: 18 }}>▶</span>}
                    sx={{
                      bgcolor: a.buttonColor,
                      color: '#fff',
                      fontWeight: 600,
                      borderRadius: 2,
                      fontSize: '1.05rem',
                      px: 3,
                      py: 1.2,
                      alignSelf: 'flex-start',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: a.buttonColor, opacity: 0.93 },
                    }}
                    onClick={() => setActiveAssessment(a.componentKey)}
                  >
                    Start Assessment
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default CognitiveAssessments;
