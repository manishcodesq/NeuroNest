import React, { useState } from "react";
import { Box, Typography, Button, Paper, TextField } from "@mui/material";

const questions = [
  {
    sentence: "She ___ her homework before dinner.",
    answer: "finished",
  },
  {
    sentence: "The children are ___ happily in the park.",
    answer: "playing",
  },
  {
    sentence: "He ___ to school every morning.",
    answer: "walks",
  },
  {
    sentence: "They have ___ their project on time.",
    answer: "completed",
  },
  {
    sentence: "Please ___ the door when you leave.",
    answer: "close",
  }
];

const WordActivities = () => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === questions[current].answer.toLowerCase()) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Wrong! The answer was "${questions[current].answer}".`);
    }
    setTimeout(() => {
      setFeedback("");
      setInput("");
      if (current + 1 < questions.length) {
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
      <Typography variant="h4" sx={{ color: "#81c784", fontWeight: 700, mb: 2, textAlign: "center", fontFamily: "Poppins" }}>
        Fill in the Blanks
      </Typography>
      <Typography sx={{ color: "#757575", fontFamily: "Poppins", textAlign: "center", mb: 3 }}>
        Type the missing word to complete the sentence!
      </Typography>
      <Paper sx={{ maxWidth: 500, mx: "auto", p: 3, borderRadius: 4 }}>
        {!finished ? (
          <>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "1.15rem", mb: 2 }}>
              {questions[current].sentence.replace("___", '_'.repeat(questions[current].answer.length))}
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
              sx={{ bgcolor: "#81c784", color: "#fff", fontFamily: "Poppins", fontWeight: 600, borderRadius: 2 }}
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
              Score: {score} / {questions.length}
            </Typography>
          </>
        ) : (
          <>
            <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, color: "#388e3c", mb: 2 }}>
              Game Over! Your Score: {score} / {questions.length}
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "#81c784", color: "#fff", fontFamily: "Poppins", fontWeight: 600, borderRadius: 2 }}
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