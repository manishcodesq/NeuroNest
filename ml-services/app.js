// ml-services/app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));


app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser()); 


import {
 registerUser,
 loginUser 
}from './routes/auth.js';
import voiceRoutes from './routes/voice.js';
import testRoutes from './routes/test.js';
// Routes
app.use('/api/voice', voiceRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/signup', registerUser);
app.use('/api/login', loginUser);

const connectDB = async () => {
try {
  await mongoose.connect(process.env.MONGO_URI, {dbName: 'test'});
  console.log('MongoDB connected')
}
catch(err){
  console.error('MongoDB connection error:', err);
}
};

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

export default app;