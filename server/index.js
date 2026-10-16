import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = 3001;
const API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  console.error('Missing YOUTUBE_API_KEY in server/.env');
  process.exit(1);
}

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the KantaKo server' });
});

app.get('/api/search', async (req, res) => {
  const q = String(req.query.q ?? '').trim();

  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const params = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    videoEmbeddable: 'true',
    maxResults: '10',
    q: `${q} karaoke`,
    key: API_KEY,
  });

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params}`
    );
    const data = await response.json();

    if (!response.ok) {
      const reason = data.error?.errors?.[0]?.reason;
      if (reason === 'quotaExceeded') {
        return res
          .status(429)
          .json({ error: 'Daily search limit reached. Try again tomorrow.' });
      }
      return res.status(502).json({ error: 'YouTube request failed' });
    }

    const results = data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channel: item.snippet.channelTitle,
    }));

    res.json({ results });
  } catch {
    res.status(502).json({ error: 'Could not reach YouTube' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});