import React, { use, useRef, useState } from "react";
import { Box, Typography, Grid, Paper, Button, Stack } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';

const tips = [
  {
    icon: <AccessTimeIcon sx={{ color: '#b39ddb', fontSize: 22 }} />,
    title: 'Recording Duration',
    text: 'Speak for 1-2 minutes for the best analysis results. You can talk about your day, describe a picture, or read a short paragraph.',
  },
  {
    icon: <SurroundSoundIcon sx={{ color: '#81c784', fontSize: 22 }} />,
    title: 'Clear Environment',
    text: 'Find a quiet space and speak at your normal volume. Make sure your device’s microphone is working properly.',
  },
  {
    icon: <VolumeUpIcon sx={{ color: '#4fc3f7', fontSize: 22 }} />,
    title: 'Natural Speech',
    text: 'Speak naturally and comfortably. There’s no need to change your usual way of speaking.',
  },
];

const processVoice = () => {
  alert("Voice recording functionality is not implemented yet. This is a placeholder for future development.");
}

const VoiceAnalysis = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [err, setErr] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChucksRef = useRef([]);

  const startRecording = async () => {
    setErr("");
    setAudioURL(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChucksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChucksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChucksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        console.log("Audio URL:", audioUrl);
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch(err) {
      setErr("Failed to access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#fcfcff', minHeight: '100vh', py: 6, px: 0, width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
      <Typography variant="h2" sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', textAlign: 'center', mb: 1 }}>
        Voice Analysis
      </Typography>
      <Typography variant="h5" sx={{ color: '#9575cd', fontWeight: 500, fontFamily: 'Poppins', textAlign: 'center', mb: 1 }}>
        Let us listen to how you're feeling
      </Typography>
      <Typography sx={{ color: '#90a4ae', fontFamily: 'Poppins', textAlign: 'center', mb: 5, fontSize: '1.15rem', maxWidth: 700, mx: 'auto' }}>
        Simply speak into your device. We'll gently analyze patterns in your voice to better understand your cognitive health.
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', m: 0 }}>
        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={0} sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: '#f3e5f5',
            boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
            border: '1.5px solid #e0e0e0',
            minHeight: 260,
            width: '100%',
            maxWidth: 420,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            mb: 2,
          }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ alignSelf: 'flex-start', mb: 2 }}>
              <VolumeUpIcon sx={{ color: '#9575cd', fontSize: 22 }} />
              <Typography sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', fontSize: '1.1rem' }}>Voice Recording</Typography>
            </Stack>
            <Box sx={{ bgcolor: '#ede7f6', borderRadius: '50%', p: 3, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MicIcon sx={{ fontSize: 56, color: '#9575cd' }} />
            </Box>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" startIcon={<MicIcon />} sx={{
                bgcolor: '#9575cd',
                color: '#fff',
                fontFamily: 'Poppins',
                fontWeight: 600,
                borderRadius: 2,
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                boxShadow: 'none',
                '&:hover': { bgcolor: '#7e57c2' },
              }}
              onClick={startRecording}
              disabled={recording}
              >
                Start Recording
              </Button>
              <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#bdbdbd",
                    color: "#fff",
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    borderRadius: 2,
                    fontSize: "1.1rem",
                    px: 4,
                    py: 1.5,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#757575" },
                  }}
                  onClick={stopRecording}
                  disabled={!recording}
                >
                  Stop
                </Button>
              </Stack>
              {err && (
              <Typography sx={{ mt: 2, color: "#d32f2f", fontWeight: 600 }}>
                {err}
              </Typography>
            )}
            {audioURL && (
              <Box sx={{ mt: 3, width: "100%" }}>
                <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, color: "#222", mb: 1 }}>
                  Your Recording:
                </Typography>
                <audio controls src={audioURL} style={{ width: "100%" }} />
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={0} sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: '#fff',
            boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
            border: '1.5px solid #e0e0e0',
            minHeight: 260,
            width: '100%',
            maxWidth: 420,
            display: 'flex', flexDirection: 'column',
            mb: 2,
          }}>
            <Typography sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', fontSize: '1.1rem', mb: 2 }}>Recording Tips</Typography>
            {tips.map((tip, idx) => (
              <Stack direction="row" spacing={2} alignItems="flex-start" mb={2} key={tip.title}>
                <Box sx={{ mt: 0.5 }}>{tip.icon}</Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontFamily: 'Poppins', color: '#222', fontSize: '1rem' }}>{tip.title}</Typography>
                  <Typography sx={{ color: '#757575', fontFamily: 'Poppins', fontSize: '0.98rem' }}>{tip.text}</Typography>
                </Box>
              </Stack>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VoiceAnalysis; 