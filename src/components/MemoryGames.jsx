import { Box, Typography, Grid, Paper, Button, Stack, Chip } from "@mui/material";
import React, { useState } from "react";

const symbols = ['🍎','🍌','🍇','🍒','🍉','🍋','🍓','🥝'];

function shuffle(array) {
    const arr = [...array];
    for(let i = arr.length -1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const MemoryGames = () => {
    const [cards, setCards] = useState(shuffle([...symbols, ...symbols]));
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [disabled, setDisabled] = useState([]);

    const handleCardClick = (idx) => {
        if(flipped.includes(idx) || matched. includes(idx) || disabled) return;
        if(flipped.length === 1 && flipped[0] === idx) return;

        const newFlipped = [...flipped, idx];
        setFlipped(newFlipped);

        if(newFlipped.length === 2){
            setDisabled(true);
            const [first, second] = newFlipped;
            if(cards[first] === cards[second]){
                setTimeout(() => {
                    setMatched([...matched, first, second]);
                    setFlipped([]);
                    setDisabled(false);
                }, 600);
            }else{
                setTimeout(() => {
                    setFlipped([]);
                    setDisabled(false);
                }, 900);
            }
        }
    };


     const resetGame = () => {
    setCards(shuffle([...symbols, ...symbols]));
    setFlipped([]);
    setMatched([]);
    setDisabled(false);
  };

  return (
    <div>
        <Box sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ color: "#9575cd", fontWeight: 700, mb: 2, textAlign: "center", fontFamily: "Poppins" }}>
        Memory Games
      </Typography>
      <Typography sx={{ color: "#757575", fontFamily: "Poppins", textAlign: "center", mb: 3 }}>
        Match all the pairs to win. Click "Restart" to play again!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button variant="contained" sx={{ bgcolor: "#9575cd", color: "#fff", fontFamily: "Poppins", fontWeight: 600, borderRadius: 2 }} onClick={resetGame}>
          Restart
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {cards.map((symbol, idx) => (
          <Grid item key={idx}>
            <Paper
              elevation={3}
              sx={{
                width: 70,
                height: 90,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontFamily: "Poppins",
                bgcolor: matched.includes(idx) || flipped.includes(idx) ? "#fff" : "#9575cd",
                color: matched.includes(idx) || flipped.includes(idx) ? "#9575cd" : "#fff",
                borderRadius: 2,
                cursor: matched.includes(idx) ? "default" : "pointer",
                border: matched.includes(idx) ? "2px solid #81c784" : "none",
                transition: "all 0.2s",
                boxShadow: matched.includes(idx) ? "0 0 12px #81c784" : "0 2px 12px rgba(80,80,120,0.07)",
                userSelect: "none",
              }}
              onClick={() => handleCardClick(idx)}
            >
              {(flipped.includes(idx) || matched.includes(idx)) ? symbol : "?"}
            </Paper>
          </Grid>
        ))}
      </Grid>
      {matched.length === cards.length && (
        <Typography sx={{ color: "#388e3c", fontFamily: "Poppins", textAlign: "center", mt: 3, fontWeight: 600 }}>
          🎉 Congratulations! You matched all cards!
        </Typography>
      )}
    </Box>
    </div>
  );
}

export default MemoryGames;