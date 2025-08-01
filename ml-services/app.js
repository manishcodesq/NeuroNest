// ml-services/app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import voiceRoutes from './routes/voice.js';
import cognitiveRoutes from './routes/cognitiveRoutes.js';
import testRoutes from './routes/test.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Create Media folder in root directory 
const mediaFolder = path.join(__dirname, "..", "Media");
if (!fs.existsSync(mediaFolder)) {
  fs.mkdirSync(mediaFolder, { recursive: true });
  console.log('Media folder created at:', mediaFolder);
}

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mediaFolder);
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const userId = req.body.userId || 'anonymous';
    cb(null, `cognitive-assessment-${userId}-${timestamp}.webm`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Screen recording upload post route
app.post("/api/upload-recording", upload.single("video"), (req, res) => {
  try {
    if (req.file) {
      console.log('Recording saved:', req.file.filename);
      res.status(200).json({ 
        message: "Recording saved successfully",
        filename: req.file.filename,
        path: req.file.path
      });
    } else {
      res.status(400).json({ error: "No file uploaded" });
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: "File upload failed" });
  }
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

// Routes
app.use('/api/cognitive', cognitiveRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/auth', authRoutes); // Changed to use /api/auth as base

export default app;
