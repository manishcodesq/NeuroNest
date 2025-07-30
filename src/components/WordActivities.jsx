import React, { useState } from "react";
import { Box, Typography, Button, Paper, TextField, IconButton, Tooltip } from "@mui/material";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Sample questions with simpler language and culturally familiar hints
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

const WordActivities = () => {
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
    <Box
      sx={{
        py: 5,
        minHeight: 350,
        maxWidth: 600,
        mx: 'auto',
        px: 3,
        bgcolor: '#e8f5e9', // warm and comfortable background
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: "'Noto Sans', 'Poppins', sans-serif",
        color: '#4a3c31', // soft dark text
      }}
      aria-live="polite"
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 2, textAlign: "center", fontSize: '2rem' }}
      >
        Fill in the Blanks
      </Typography>
      <Typography
        sx={{
          mb: 3,
          textAlign: "center",
          fontSize: '1.2rem',
          lineHeight: 1.5,
          letterSpacing: '0.03em',
        }}
      >
        Type the missing word to complete the sentence. Use the hint if you need help.
      </Typography>
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: '#fff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
        role="region"
        aria-label="Fill in the blanks activity"
      >
        {!finished ? (
          <>
            <Typography
              sx={{ fontSize: '1.3rem', mb: 3, textAlign: 'center', letterSpacing: 0.5 }}
              aria-live="polite"
            >
              {questions[current].sentence.replace(
                "___",
                '_'.repeat(questions[current].answer.length)
              )}
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
                inputProps={{ 'aria-describedby': 'feedback-text' }}
              />
              <Tooltip title="Show Hint" arrow>
                <IconButton
                  aria-label="Show hint"
                  onClick={() => setShowHint(!showHint)}
                  disabled={!!feedback}
                  sx={{ ml: 2 }}
                >
                  <LightbulbIcon color={showHint ? "primary" : "disabled"} />
                </IconButton>
              </Tooltip>
            </Box>

            {showHint && (
              <Typography
                sx={{
                  color: "#555",
                  fontSize: '1rem',
                  mb: 2,
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}
                id="hint-text"
                role="alert"
              >
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
              aria-describedby="feedback-text"
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
                id="feedback-text"
                role="alert"
              >
                {feedback}
              </Typography>
            )}

            <Typography
              sx={{ mt: 3, color: "#222", fontWeight: 600, fontSize: '1.1rem', textAlign: 'center' }}
              aria-live="polite"
            >
              Score: {score} / {questions.length}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              sx={{ fontWeight: 700, color: "#388e3c", fontSize: '1.4rem', mb: 3, textAlign: 'center' }}
              role="alert"
            >
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
    </Box>
  );
};

export default WordActivities;
