import 'dotenv/config';
import express from 'express';
import { createRoom, getRoom, toPublicRoom, addSong } from './rooms.js';

const app = express();
const PORT = 3001;
const API_KEY = process.env.YOUTUBE_API_KEY;
const MAX_QUEUE = 50;

app.use(express.json()); 

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

app.post('/api/rooms', (req, res) => {
  const name = String(req.body?.name ?? '').trim();

  if (!name) {
    return res.status(400).json({ error: 'Room name is required' });
  }

  const room = createRoom(name);
  res.status(201).json({ code: room.code, hostToken: room.hostToken });
});

app.get('/api/rooms/:code', (req, res) => {
  const room = getRoom(req.params.code);

  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  res.json(toPublicRoom(room));
});

app.post('/api/rooms/:code/queue', (req, res) => {
  const room = getRoom(req.params.code);

  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  const videoId = String(req.body?.videoId ?? '').trim();
  const title = String(req.body?.title ?? '').trim();
  const thumbnail = String(req.body?.thumbnail ?? '').trim();
  const channel = String(req.body?.channel ?? '').trim();
  const userName = String(req.body?.userName ?? '').trim();

  if (!videoId || !title || !userName) {
    return res
      .status(400)
      .json({ error: 'videoId, title and userName are required' });
  }

  if (videoId.length > 20 || title.length > 200 || userName.length > 30) {
    return res.status(400).json({ error: 'A field is too long' });
  }

  if (room.queue.length >= MAX_QUEUE) {
    return res.status(429).json({ error: 'The queue is full' });
  }

  addSong(room, { videoId, title, thumbnail, channel, userName });
  res.status(201).json(toPublicRoom(room));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});