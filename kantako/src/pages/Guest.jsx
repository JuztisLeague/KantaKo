import { useParams } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

function Guest() {
  const { roomId, userName } = useParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSearch() {

    const q = query.trim();

    if (!q) {
      setMessage('Type a song to search');
      return;
    }
    setSearching(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Search failed');
        return;
      }

      setResults(data.results);
    } catch {
      setMessage('Could not reach the server');
    } finally {
      setSearching(false);
    }

   }
   
   async function handleAdd(song) {
  try {
    const res = await fetch(`/api/rooms/${roomId}/queue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoId: song.videoId,
        title: song.title,
        thumbnail: song.thumbnail,
        channel: song.channel,
        userName,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || 'Could not add the song');
      return;
    }
    setMessage(`Added "${song.title}"`);
  } catch {
   setMessage('Could not reach the server');
  }
}
  

  return (
    <div className="main-app">
      <h1>Hi, {userName}!</h1>
      <p>Room code: {roomId}</p>
      
      <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder = "Song title and artist"
      />

      <button onClick={handleSearch} disabled={searching}>
        {searching ? 'Searching...' : 'Search'}
      </button>

       {message && <p className="message">{message}</p>}

      <ul>
        {results.map((song) => (
          <li key={song.videoId}>
            <img src={song.thumbnail} alt="" />
            <div>{song.title}</div>
            <div>{song.channel}</div>
            <button onClick={() => handleAdd(song)}>Add to Queue</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Guest;