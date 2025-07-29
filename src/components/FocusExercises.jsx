import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const getRandomPosition = () => ({
  top: Math.floor(Math.random() * 300) + 40,
  left: Math.floor(Math.random() * 400) + 40,
});

const symbols = ["🍉", "🍋", "🍎", "🍌", "🍓", "🍇", "🍒", "🥝"];

const FocusExercises = () => {
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(30);
  const intervalRef = useRef();

  useEffect(() => {
    if (active && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
    if (timer === 0) {
      setActive(false);
      setTargets([]);
    }
  }, [active, timer]);

  useEffect(() => {
    if (active) {
      const spawn = setInterval(() => {
        setTargets((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            ...getRandomPosition(),
          },
        ]);
      }, 700);
      return () => clearInterval(spawn);
    }
  }, [active]);

  const handleSlash = (id) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setScore((s) => s + 1);
  };

  const startGame = () => {
    setScore(0);
    setTimer(60);
    setTargets([]);
    setActive(true);
  };

  return (
    <Box sx={{ py: 4, minHeight: 400 }}>
      <Typography variant="h4" sx={{ color: "#90caf9", fontWeight: 700, mb: 2, textAlign: "center", fontFamily: "Poppins" }}>
        Focus Ninja Slash
      </Typography>
      <Typography sx={{ color: "#757575", fontFamily: "Poppins", textAlign: "center", mb: 3 }}>
        Click (slash) the fruits as fast as you can! Test your focus and reaction speed.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#90caf9", color: "#fff", fontFamily: "Poppins", fontWeight: 600, borderRadius: 2 }}
          onClick={startGame}
          disabled={active}
        >
          Start
        </Button>
      </Box>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, color: "#222" }}>
          Time Left: {timer}s &nbsp; | &nbsp; Score: {score}
        </Typography>
      </Box>
      <Box sx={{ position: "relative", width: 500, height: 380, mx: "auto", bgcolor: "#e3f2fd", borderRadius: 4, overflow: "hidden", border: "2px solid #90caf9" }}>
        {targets.map((t) => (
          <Paper
            key={t.id}
            elevation={4}
            sx={{
              position: "absolute",
              top: t.top,
              left: t.left,
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontFamily: "Poppins",
              bgcolor: "#fff",
              color: "#90caf9",
              borderRadius: "50%",
              cursor: "pointer",
              transition: "transform 0.1s",
              "&:active": { transform: "scale(0.85)" },
              userSelect: "none",
            }}
            onClick={() => handleSlash(t.id)}
          >
            {t.symbol}
          </Paper>
        ))}
        {!active && timer === 0 && (
          <Typography sx={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", color: "#388e3c", fontFamily: "Poppins", fontWeight: 700, fontSize: "1.3rem" }}>
            Game Over! Your Score: {score}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FocusExercises;