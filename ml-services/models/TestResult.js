// ml-services/models/TestResult.js
import mongoose from 'mongoose';

const TestResultSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  testData: Object,
  score: Number,
  timestamp: { type: Date, default: Date.now }
});

const TestResult = mongoose.model('TestResult', TestResultSchema);
export default TestResult;
