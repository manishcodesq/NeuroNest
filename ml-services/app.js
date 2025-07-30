// ml-services/app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import voiceRoutes from './routes/voice.js';
import testRoutes from './routes/test.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/voice', voiceRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/signup', authRoutes);
app.use('/api/login', authRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

export default app;