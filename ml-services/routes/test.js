// ml-services/routes/test.js
import express from 'express';
import TestResult from '../models/TestResult.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Route to submit a cognitive test result
router.post('/', auth, async (req, res) => {
  const { testData, score } = req.body;

  try {
    const newTestResult = await TestResult.create({
      user: req.user.id,
      testData,
      score
    });
    res.json(newTestResult);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save test result' });
  }
});

// Route to get last 20 cognitive test results for the user
router.get('/log', auth, async (req, res) => {
  try {
    const tests = await TestResult.find({ user: req.user.id })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch test results' });
  }
});

export default router;

