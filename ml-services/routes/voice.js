// ml-services/routes/voice.js
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import VoiceFeature from '../models/VoiceFeature.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Set up multer to save uploads temporarily in 'uploads/' folder
const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:5000/analyze-audio';

    // Prepare form-data to send file to ML microservice
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path), req.file.originalname);

    // Send audio file to ML microservice for processing
    const response = await axios.post(mlServiceUrl, form, {
      headers: form.getHeaders()
    });

    // Store the features result in MongoDB with user reference
    const newFeature = await VoiceFeature.create({
      user: req.user.id,
      features: response.data
    });

    // Delete temporary uploaded file
    fs.unlinkSync(req.file.path);

    res.json(newFeature);
  } catch (err) {
    // Make sure to delete uploaded file on error if it exists
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error(err);
    res.status(500).json({ error: 'Voice upload or analysis failed', details: err.message });
  }
});

router.get('/log', auth, async (req, res) => {
  try {
    const voiceData = await VoiceFeature.find({ user: req.user.id })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(voiceData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch voice features' });
  }
});

export default router;
