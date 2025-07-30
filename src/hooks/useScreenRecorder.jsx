// src/hooks/useScreenRecorder.js
import { useState, useEffect, useRef } from 'react';

const useScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState(null);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      setError(null);
      // Request screen capture
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' },
        audio: true
      });
      
      streamRef.current = stream;
      chunksRef.current = [];

      // Create MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordingBlob(blob);
        setIsRecording(false);
      };

      // Handle stream ending (user stops sharing)
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        stopRecording();
      });

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to start screen recording. Please allow screen capture.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const saveRecording = async (userId = 'anonymous') => {
    if (!recordingBlob) return { success: false, error: 'No recording to save' };

    try {
      const formData = new FormData();
      formData.append('video', recordingBlob, 'cognitive-assessment-recording.webm');
      formData.append('userId', userId);

      const response = await fetch('http://localhost:4000/api/upload-recording', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, data: result };
      } else {
        return { success: false, error: 'Failed to save recording' };
      }
    } catch (error) {
      console.error('Save recording error:', error);
      return { success: false, error: 'Network error while saving recording' };
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        stopRecording();
      }
    };
  }, [isRecording]);

  return {
    isRecording,
    recordingBlob,
    error,
    startRecording,
    stopRecording,
    saveRecording
  };
};

export default useScreenRecorder;
