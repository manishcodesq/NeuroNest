import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, LinearProgress, Stack } from '@mui/material';

const FocusTimer = () => {
  const totalTime = 300; // 5 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Start timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  // Pause or resume timer
  const togglePause = () => {
    if (isRunning) {
      setIsPaused(!isPaused);
    }
  };

  // Reset timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(totalTime);
  };

  // Effect to handle timer tick every second
  useEffect(() => {
    if (isRunning && !isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    // Cleanup on pause or stop
    return () => clearInterval(timerRef.current);
  }, [isRunning, isPaused]);

  // Effect to handle completion
  useEffect(() => {
    if (timeRemaining === 0) {
      setIsRunning(false);
      setIsPaused(false);
      playCompletionSound();

      // Optional: alert or notification
      setTimeout(() => {
        alert('🎉 Congratulations! You completed your 5-minute focus session!');
      }, 500);
    }
  }, [timeRemaining]);

  // Play simple beep sound on completion
  const playCompletionSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 1);
    } catch (err) {
      console.log('Audio not supported', err);
    }
  };

  // Determine timer display color and style
  let timerColor = '#000';
  if (timeRemaining === 0) {
    timerColor = '#ff0000';
  } else if (timeRemaining <= 30) {
    timerColor = '#ff6600';
  }

  // Progress bar value (0-100)
  const progressValue = ((totalTime - timeRemaining) / totalTime) * 100;

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', my: 6, px: 3, py: 4, bgcolor: '#f9f9f9', borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, fontFamily: 'Poppins' }}>
        🎯 5-Minute Focus Timer
      </Typography>
      <Typography sx={{ mb: 3, fontFamily: 'Poppins' }}>
        Use this timer to practice focused attention and improve your concentration skills.
        When the timer completes, take a moment to reflect on your focus quality.
      </Typography>

      <Box
        sx={{
          textAlign: 'center',
          fontSize: 64,
          fontWeight: 600,
          fontFamily: 'Poppins',
          color: timerColor,
          textShadow: timeRemaining === 0 ? '2px 2px 4px rgba(255, 0, 0, 0.3)' : 'none',
          mb: 1,
        }}
      >
        {formatTime(timeRemaining)}
      </Box>
      <Typography sx={{ textAlign: 'center', mb: 3, fontFamily: 'Poppins', fontWeight: 600, color: '#666' }}>
        minutes
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        {!isRunning && (
          <Button variant="contained" onClick={startTimer} sx={{ px: 4, fontWeight: 600, fontFamily: 'Poppins' }}>
            Start Focus Session
          </Button>
        )}

        {isRunning && (
          <>
            <Button variant="outlined" color="primary" onClick={togglePause} sx={{ px: 4, fontWeight: 600, fontFamily: 'Poppins' }}>
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={resetTimer} sx={{ px: 4, fontWeight: 600, fontFamily: 'Poppins' }}>
              Reset
            </Button>
          </>
        )}
      </Stack>

      <Typography sx={{ textAlign: 'center', mb: 2, fontFamily: 'Poppins', color: '#444' }}>
        {isRunning
          ? isPaused
            ? '⏸️ Timer paused'
            : '🎯 Focus session in progress...'
          : 'Ready to begin your focus session'}
      </Typography>

      <LinearProgress variant="determinate" value={progressValue} sx={{ height: 10, borderRadius: 5 }} />
    </Box>
  );
};

export default FocusTimer;
