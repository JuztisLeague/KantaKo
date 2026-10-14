import express from 'express';

const app = express();
const PORT = 3001;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the KantaKo server' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});