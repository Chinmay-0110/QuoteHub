const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let quotes = [
  { quote: "Be curious, not judgmental.", author: "Walt Whitman" },
  { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
];

app.get('/random', (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(random);
});

app.post('/add', (req, res) => {
  const { quote, author } = req.body;
  if (quote && author) {
    quotes.push({ quote, author });
    res.status(201).json({ message: 'Quote added successfully!' });
  } else {
    res.status(400).json({ message: 'Both quote and author are required.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
