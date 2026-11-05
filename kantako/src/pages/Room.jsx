import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

function Room() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadRoom() {
      try {
        const res = await fetch(`/api/rooms/${roomId}`);

        if (res.status === 404) {
          setStatus('notfound');
          return;
        }

        if (!res.ok) {
          setStatus('error');
          return;
        }

        const data = await res.json();
        setRoom(data);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    }

    loadRoom();
  }, [roomId]);

  if (status === 'loading') {
    return <div className="main-app"><p>Loading...</p></div>;
  }

  if (status === 'notfound') {
    return (
      <div className="main-app">
        <h1>Room not found</h1>
        <p>This room doesn't exist, or the server restarted.</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="main-app">
        <h1>Something went wrong</h1>
        <p>Could not reach the server.</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="main-app">
      <h1>{room.name}</h1>
      <p>Room Code: {room.code}</p>
    </div>
  );
}

export default Room;