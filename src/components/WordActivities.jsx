import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  TextField, 
  IconButton, 
  Tooltip,
  Tabs,
  Tab,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Card,
  CardContent
} from "@mui/material";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MemoryIcon from '@mui/icons-material/Psychology';

// Your existing fill-in-the-blanks questions
const questions = [
  {
    sentence: "She ___ apples for the festival.",
    answer: "bought",
    hint: "To get something by paying money",
  },
  {
    sentence: "The children are ___ in the garden.",
    answer: "playing",
    hint: "Having fun with friends",
  },
  {
    sentence: "He ___ tea every morning.",
    answer: "drinks",
    hint: "To take liquid through the mouth",
  },
  {
    sentence: "They have ___ the rangoli on the floor.",
    answer: "drawn",
    hint: "Created a decorative design",
  },
  {
    sentence: "Please ___ the door before leaving.",
    answer: "close",
    hint: "Opposite of open",
  },
];

// API functions
const generateCognitiveGames = async () => {
  const response = await fetch('http://localhost:4000/api/cognitive/generate-cognitive-games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const validateAnswers = async (data) => {
  const response = await fetch('http://localhost:4000/api/cognitive/validate-answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Simple Memory Test Component
const SimpleMemoryTest = () => {
  const [gameData, setGameData] = useState(null);
  const [currentPhase, setCurrentPhase] = useState('loading');
  const [currentView, setCurrentView] = useState('words');
  const [studyTime, setStudyTime] = useState(30);
  const [userAnswers, setUserAnswers] = useState({
    wordListAnswer: '',
    wordPairAnswers: {},
    numberForwardAnswer: '',
    numberBackwardAnswer: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    generateGameData();
  }, []);

  React.useEffect(() => {
    if (currentPhase === 'study' && studyTime > 0) {
      const timer = setTimeout(() => setStudyTime(studyTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPhase, studyTime]);

  const generateGameData = async () => {
    setLoading(true);
    try {
      const data = await generateCognitiveGames();
      if (data.success) {
        setGameData(data.data);
        setCurrentPhase('study');
        setStudyTime(30);
      }
    } catch (error) {
      console.error('Failed to generate game data:', error);
    }
    setLoading(false);
  };

  const nextStudyView = () => {
    if (currentView === 'words') {
      setCurrentView('pairs');
      setStudyTime(30);
    } else if (currentView === 'pairs') {
      setCurrentView('numbers');
      setStudyTime(20);
    } else {
      setCurrentPhase('test');
    }
  };

  const submitAnswers = async () => {
    setLoading(true);
    try {
      const data = await validateAnswers({
        originalData: gameData,
        ...userAnswers
      });
      if (data.success) {
        setResults(data.scores);
        setCurrentPhase('results');
      }
    } catch (error) {
      console.error('Failed to validate answers:', error);
    }
    setLoading(false);
  };

  const restartTest = () => {
    setCurrentPhase('loading');
    setCurrentView('words');
    setUserAnswers({
      wordListAnswer: '',
      wordPairAnswers: {},
      numberForwardAnswer: '',
      numberBackwardAnswer: ''
    });
    setResults(null);
    generateGameData();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {currentPhase === 'loading' && (
        <Alert severity="info">Generating your memory test...</Alert>
      )}
      
      {currentPhase === 'study' && gameData && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
            Study Phase - {studyTime}s remaining
          </Typography>
          
          {currentView === 'words' && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Memorize these words:</Typography>
              <Grid container spacing={2}>
                {gameData.wordList.map((word, index) => (
                  <Grid item xs={4} key={index}>
                    <Chip label={word} sx={{ width: '100%', fontSize: '1rem' }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          {currentView === 'pairs' && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Memorize these word pairs:</Typography>
              {gameData.wordPairs.map((pair, index) => (
                <Box key={index} sx={{ mb: 1, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body1">
                    <strong>{pair.first}</strong> - <strong>{pair.second}</strong>
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          
          {currentView === 'numbers' && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Memorize this number sequence:</Typography>
              <Typography variant="h4" sx={{ textAlign: 'center', fontFamily: 'monospace' }}>
                {gameData.numberSequence.join(' - ')}
              </Typography>
            </Box>
          )}
          
          <Button
            variant="contained"
            onClick={nextStudyView}
            disabled={studyTime > 0}
            sx={{ mt: 3, display: 'block', mx: 'auto' }}
          >
            {studyTime > 0 ? `Wait ${studyTime}s` : 'Next'}
          </Button>
        </Paper>
      )}
      
      {currentPhase === 'test' && gameData && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            Memory Test
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Word List Recall</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={userAnswers.wordListAnswer}
              onChange={(e) => setUserAnswers(prev => ({ ...prev, wordListAnswer: e.target.value }))}
              placeholder="Type all the words you remember (separated by commas)"
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Word Pair Associations</Typography>
            {gameData.wordPairs.map((pair, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label={`${pair.first} was paired with:`}
                  value={userAnswers.wordPairAnswers[pair.first] || ''}
                  onChange={(e) => setUserAnswers(prev => ({
                    ...prev,
                    wordPairAnswers: {
                      ...prev.wordPairAnswers,
                      [pair.first]: e.target.value
                    }
                  }))}
                />
              </Box>
            ))}
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Number Sequence</Typography>
            <TextField
              fullWidth
              label="Forward sequence"
              value={userAnswers.numberForwardAnswer}
              onChange={(e) => setUserAnswers(prev => ({ ...prev, numberForwardAnswer: e.target.value }))}
              placeholder="4 7 2 9 1 5 8"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Backward sequence"
              value={userAnswers.numberBackwardAnswer}
              onChange={(e) => setUserAnswers(prev => ({ ...prev, numberBackwardAnswer: e.target.value }))}
              placeholder="8 5 1 9 2 7 4"
            />
          </Box>
          
          <Button
            variant="contained"
            onClick={submitAnswers}
            sx={{ display: 'block', mx: 'auto' }}
            disabled={loading}
          >
            Check Answers
          </Button>
        </Paper>
      )}
      
      {currentPhase === 'results' && results && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', color: '#388e3c' }}>
            Your Results
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">Word List</Typography>
                  <Typography variant="h4" color="primary">
                    {results.wordList}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">Word Pairs</Typography>
                  <Typography variant="h4" color="primary">
                    {results.wordPairs}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">Forward</Typography>
                  <Typography variant="h4" color="primary">
                    {results.numberForward}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">Backward</Typography>
                  <Typography variant="h4" color="primary">
                    {results.numberBackward}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Card sx={{ mb: 3, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Total Score</Typography>
              <Typography variant="h3" color="success.main">
                {results.total}
              </Typography>
              <Typography variant="h5" color="success.main">
                {results.percentage}
              </Typography>
            </CardContent>
          </Card>
          
          <Button
            variant="contained"
            onClick={restartTest}
            sx={{ display: 'block', mx: 'auto' }}
          >
            Take Another Test
          </Button>
        </Paper>
      )}
    </Box>
  );
};

// Your existing Fill in the Blanks component (unchanged)
const FillInTheBlanks = () => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === questions[current].answer.toLowerCase()) {
      setScore(score + 1);
      setFeedback("Correct! Well done.");
    } else {
      setFeedback(`Not quite. The correct word is "${questions[current].answer}".`);
    }
    setTimeout(() => {
      setFeedback("");
      setInput("");
      setShowHint(false);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setFinished(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrent(0);
    setInput("");
    setScore(0);
    setFinished(false);
    setFeedback("");
    setShowHint(false);
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 3, bgcolor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      {!finished ? (
        <>
          <Typography sx={{ fontSize: '1.3rem', mb: 3, textAlign: 'center', letterSpacing: 0.5 }}>
            {questions[current].sentence.replace("___", '_'.repeat(questions[current].answer.length))}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
              value={input}
              onChange={e => setInput(e.target.value)}
              label="Your answer"
              variant="outlined"
              sx={{ flexGrow: 1, fontSize: '1.1rem' }}
              disabled={!!feedback}
              autoFocus
            />
            <Tooltip title="Show Hint" arrow>
              <IconButton
                onClick={() => setShowHint(!showHint)}
                disabled={!!feedback}
                sx={{ ml: 2 }}
              >
                <LightbulbIcon color={showHint ? "primary" : "disabled"} />
              </IconButton>
            </Tooltip>
          </Box>

          {showHint && (
            <Typography sx={{ color: "#555", fontSize: '1rem', mb: 2, fontStyle: 'italic', textAlign: 'center' }}>
              Hint: {questions[current].hint}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{
              bgcolor: "#81c784",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 2,
              fontSize: '1.1rem',
              px: 5,
              mx: 'auto',
              display: 'block',
            }}
            onClick={handleSubmit}
            disabled={!input || !!feedback}
          >
            Submit
          </Button>

          {feedback && (
            <Typography
              sx={{
                mt: 2,
                color: feedback.startsWith("Correct") ? "#388e3c" : "#d32f2f",
                fontWeight: 600,
                fontSize: '1.1rem',
                textAlign: 'center',
              }}
            >
              {feedback}
            </Typography>
          )}

          <Typography sx={{ mt: 3, color: "#222", fontWeight: 600, fontSize: '1.1rem', textAlign: 'center' }}>
            Score: {score} / {questions.length}
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ fontWeight: 700, color: "#388e3c", fontSize: '1.4rem', mb: 3, textAlign: 'center' }}>
            🎉 Game Over! Your Score: {score} / {questions.length}
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#81c784",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 2,
              fontSize: '1.1rem',
              px: 6,
              display: 'block',
              mx: 'auto',
            }}
            onClick={handleRestart}
          >
            Play Again
          </Button>
        </>
      )}
    </Paper>
  );
};

// Main Component with Tabs
const WordActivities = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        py: 5,
        minHeight: 350,
        maxWidth: 800,
        mx: 'auto',
        px: 3,
        bgcolor: '#e8f5e9',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: "'Noto Sans', 'Poppins', sans-serif",
        color: '#4a3c31',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: "center", fontSize: '2rem' }}>
        Word & Memory Activities
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 3 }} variant="fullWidth">
        <Tab label="Fill in the Blanks" icon={<LightbulbIcon />} iconPosition="start" />
        <Tab label="Memory Test" icon={<MemoryIcon />} iconPosition="start" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          <Typography sx={{ mb: 3, textAlign: "center", fontSize: '1.2rem', lineHeight: 1.5, letterSpacing: '0.03em' }}>
            Type the missing word to complete the sentence. Use the hint if you need help.
          </Typography>
          <FillInTheBlanks />
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography sx={{ mb: 3, textAlign: "center", fontSize: '1.2rem', lineHeight: 1.5, letterSpacing: '0.03em' }}>
            Test your memory with words, pairs, and number sequences. Study carefully, then recall what you learned!
          </Typography>
          <SimpleMemoryTest />
        </Box>
      )}
    </Box>
  );
};

export default WordActivities;
