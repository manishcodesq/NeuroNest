import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post('/generate-cognitive-games', async (req, res) => {
  try {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const gamesPrompt = `
      Generate cognitive memory test data in the following JSON format:
  
      {
        "wordList": ["word1", "word2", ... 12 unrelated words],
        "wordPairs": [
          {"first": "word1", "second": "word2"},
          {"first": "word3", "second": "word4"},
          ... 8 pairs total
        ],
        "numberSequence": [4, 7, 2, 9, 1, 5, 8]
      }
  
      Requirements:
      - Word list: 12 completely unrelated, simple words (nouns, verbs, adjectives)
      - Word pairs: 8 pairs of unrelated words for association memory test
      - Number sequence: 7 single digits (0-9) in random order
  
      Return ONLY the JSON object, no additional text, no markdown formatting, no code blocks.
      `;

    const gamesResponse = await model.generateContent(gamesPrompt);
    const gamesDataText = await gamesResponse.response.text();

    console.log('Raw Gemini response:', gamesDataText);

    // Robust JSON cleaning
    let cleanedResponse = gamesDataText.trim();

    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/```$/, '').trim();
    } else if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/```$/, '').trim();
    }


    cleanedResponse = cleanedResponse.replace(/`/g, '').trim();

    const jsonStart = cleanedResponse.indexOf('{');
    const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;

    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
    }

    console.log('Cleaned response:', cleanedResponse);

    // Validate before parsing
    if (!cleanedResponse.startsWith('{') || !cleanedResponse.endsWith('}')) {
      throw new Error('Invalid JSON structure after cleaning');
    }

    const gamesData = JSON.parse(cleanedResponse);

    // Validate structure
    if (!gamesData.wordList || !gamesData.wordPairs || !gamesData.numberSequence) {
      throw new Error('Invalid game data structure');
    }

    res.json({
      success: true,
      data: gamesData
    });

  } catch (error) {
    console.error('Cognitive games generation error:', error);

    // Fallback data
    const fallbackData = {
      wordList: ["apple", "chair", "happy", "ocean", "guitar", "purple", "running", "mountain", "book", "butterfly", "thunder", "carpet"],
      wordPairs: [
        { "first": "tree", "second": "mirror" },
        { "first": "blue", "second": "stone" },
        { "first": "cat", "second": "pencil" },
        { "first": "rain", "second": "clock" },
        { "first": "fire", "second": "shoe" },
        { "first": "moon", "second": "bread" },
        { "first": "glass", "second": "flower" },
        { "first": "wind", "second": "key" }
      ],
      numberSequence: [4, 7, 2, 9, 1, 5, 8]
    };

    res.json({
      success: true,
      data: fallbackData,
      note: "Using fallback data due to AI response parsing issue"
    });
  }
});

router.post('/validate-answers', async (req, res) => {
  try {
    const {
      originalData,
      wordListAnswer,
      wordPairAnswers,
      numberForwardAnswer,
      numberBackwardAnswer
    } = req.body;

    if (!originalData) {
      return res.status(400).json({
        success: false,
        error: "Original game data is required"
      });
    }

    // Calculate scores
    const scores = {
      wordList: 0,
      wordPairs: 0,
      numberForward: 0,
      numberBackward: 0
    };

    // Word list scoring
    if (wordListAnswer) {
      const userWords = wordListAnswer.toLowerCase().split(',').map(w => w.trim());
      const originalWords = originalData.wordList.map(w => w.toLowerCase());
      scores.wordList = userWords.filter(word => originalWords.includes(word)).length;
    }

    // Word pairs scoring
    if (wordPairAnswers) {
      for (const pair of originalData.wordPairs) {
        const userAnswer = wordPairAnswers[pair.first]?.toLowerCase()?.trim();
        if (userAnswer === pair.second.toLowerCase()) {
          scores.wordPairs++;
        }
      }
    }

    // Number sequence forward scoring
    if (numberForwardAnswer) {
      const userSequence = numberForwardAnswer.trim().split(/\s+/).map(n => parseInt(n));
      const originalSequence = originalData.numberSequence;
      if (JSON.stringify(userSequence) === JSON.stringify(originalSequence)) {
        scores.numberForward = 1;
      }
    }

    // Number sequence backward scoring
    if (numberBackwardAnswer) {
      const userSequence = numberBackwardAnswer.trim().split(/\s+/).map(n => parseInt(n));
      const reversedOriginal = [...originalData.numberSequence].reverse();
      if (JSON.stringify(userSequence) === JSON.stringify(reversedOriginal)) {
        scores.numberBackward = 1;
      }
    }

    // Calculate totals
    const totalScore = scores.wordList + scores.wordPairs + scores.numberForward + scores.numberBackward;
    const maxScore = originalData.wordList.length + originalData.wordPairs.length + 2;
    const percentage = Math.round((totalScore / maxScore) * 100);

    res.json({
      success: true,
      scores: {
        wordList: `${scores.wordList}/${originalData.wordList.length}`,
        wordPairs: `${scores.wordPairs}/${originalData.wordPairs.length}`,
        numberForward: `${scores.numberForward}/1`,
        numberBackward: `${scores.numberBackward}/1`,
        total: `${totalScore}/${maxScore}`,
        percentage: `${percentage}%`
      },
      originalData,
      userAnswers: {
        wordListAnswer,
        wordPairAnswers,
        numberForwardAnswer,
        numberBackwardAnswer
      }
    });

  } catch (error) {
    console.error('Answer validation error:', error);
    res.status(500).json({
      success: false,
      error: "Failed to validate answers"
    });
  }
});

export default router;
