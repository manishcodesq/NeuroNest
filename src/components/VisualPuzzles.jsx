import React, { useState } from "react";
import { Box, Typography, Button, Paper, TextField, IconButton, Tooltip } from "@mui/material";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// India-related and religious-themed puzzles with hints
const puzzles = [
  {
    question: "I am round, golden, and often found in temples. What am I?",
    answer: "prasad",
    hint: "A sweet offering to God.",
  },
  {
    question: "I am a holy river flowing through India, many take a dip in me. Who am I?",
    answer: "ganges",
    hint: "A major river, also called Ganga.",
  },
  {
    question: "I am a festival of lights celebrated with diyas and sweets. What is my name?",
    answer: "diwali",
    hint: "Known as the festival of lights.",
  },
  {
    question: "I am the vehicle of Lord Shiva, often depicted as a bull. What am I called?",
    answer: "nandi",
    hint: "A sacred bull, found outside Shiva temples.",
  },
  {
    question: "I am a traditional Indian sweet made of milk and sugar, shaped into balls. What is my name?",
    answer: "rasgulla",
    hint: "Soft white sweet, spongy in texture.",
  },
  {
    question: "I am a sacred mantra often chanted in Hindu prayers, spelled O-M. What am I?",
    answer: "om",
    hint: "A universal sound symbol.",
  }
];

const VisualPuzzles = () => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === puzzles[current].answer.toLowerCase()) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Wrong! The answer was "${puzzles[current].answer}".`);
    }
    setTimeout(() => {
      setFeedback("");
      setInput("");
      setShowHint(false);
      if (current + 1 < puzzles.length) {
        setCurrent(current + 1);
      } else {
        setFinished(true);
      }
    }, 1500);
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
    <Box sx={{ py: 4, minHeight: 300 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#ffd54f",
          fontWeight: 700,
          mb: 2,
          textAlign: "center",
          fontFamily: "Poppins",
        }}
      >
        Visual Puzzles & Riddles - Indian Edition
      </Typography>
      <Typography
        sx={{
          color: "#757575",
          fontFamily: "Poppins",
          textAlign: "center",
          mb: 3,
        }}
      >
        Solve these culturally familiar riddles by typing your answer! Use the hint if you need help.
      </Typography>
      <Paper sx={{ maxWidth: 500, mx: "auto", p: 3, borderRadius: 4 }}>
        {!finished ? (
          <>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "1.15rem",
                mb: 2,
                textAlign: 'center'
              }}
            >
              {puzzles[current].question}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                label="Your answer"
                variant="outlined"
                sx={{ width: "100%" }}
                disabled={!!feedback}
                autoFocus
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
                Hint: {puzzles[current].hint}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{
                bgcolor: "#ffd54f",
                color: "#fff",
                fontFamily: "Poppins",
                fontWeight: 600,
                borderRadius: 2,
                mt: 1
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
                  color: feedback === "Correct!" ? "#388e3c" : "#d32f2f",
                  fontWeight: 600,
                }}
              >
                {feedback}
              </Typography>
            )}
            <Typography
              sx={{ mt: 2, color: "#222", fontFamily: "Poppins", textAlign: 'center' }}
            >
              Score: {score} / {puzzles.length}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              sx={{ fontFamily: "Poppins", fontWeight: 600, color: "#ffd54f", mb: 2, textAlign: 'center' }}
            >
              🎉 Game Over! Your Score: {score} / {puzzles.length}
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#ffd54f",
                color: "#fff",
                fontFamily: "Poppins",
                fontWeight: 600,
                borderRadius: 2,
                display: 'block',
                mx: 'auto'
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

export default VisualPuzzles;
