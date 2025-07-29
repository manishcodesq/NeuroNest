import React, { useState } from "react";
import { Box, Typography, Button, Paper, TextField } from "@mui/material";

const puzzles = [
  {
    question: "What has keys but can't open locks?",
    answer: "piano",
  },
  {
    question: "I speak without a mouth and hear without ears. What am I?",
    answer: "echo",
  },
  {
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: "m",
  },
  {
    question: "What gets wetter as it dries?",
    answer: "towel",
  },
  {
    question: "What has a heart that doesn’t beat?",
    answer: "artichoke",
  },
];

const VisualPuzzles = () => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");

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
      if (current + 1 < puzzles.length) {
        setCurrent(current + 1);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const handleRestart = () => {
    setCurrent(0);
    setInput("");
    setScore(0);
    setFinished(false);
    setFeedback("");
  };

  return (
    <Box sx={{ py: 4, minHeight: 300 }}>
      <Typography variant="h4" sx={{ color: "#ffd54f", fontWeight: 700, mb: 2, textAlign: "center", fontFamily: "Poppins" }}>
        Visual Puzzles & Riddles
      </Typography>
      <Typography sx={{ color: "#757575", fontFamily: "Poppins", textAlign: "center", mb: 3 }}>
        Solve the riddle by typing your answer!
      </Typography>
      <Paper sx={{ maxWidth: 500, mx: "auto", p: 3, borderRadius: 4 }}>
        {!finished ? (
          <>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "1.15rem", mb: 2 }}>
              {puzzles[current].question}
            </Typography>
            <TextField
              value={input}
              onChange={e => setInput(e.target.value)}
              label="Your answer"
              variant="outlined"
              sx={{ mb: 2, width: "100%" }}
              disabled={!!feedback}
              autoFocus
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "#ffd54f", color: "#fff", fontFamily: "Poppins", fontWeight: 600, borderRadius: 2 }}
              onClick={handleSubmit}
              disabled={!input || !!feedback}
            >
              Submit
            </Button>
            {feedback && (
              <Typography sx={{ mt: 2, color: feedback === "Correct!" ? "#388e3c" : "#d32f2f", fontWeight: 600 }}>
                {feedback}
              </Typography>
            )}
            <Typography sx={{ mt: 2, color: "#222", fontFamily: "Poppins" }}>
              Score: {score} / {puzzles.length}
            </Typography>
          </>
        ) : (
          <>
            <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, color: "#ffd54f", mb: 2 }}>
              Game Over! Your Score: {score} / {puzzles.length}
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "#ffd54f", color: "#fff", fontFamily: "Poppins", fontWeight: 600, borderRadius: 2 }}
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