import { useState } from 'react';
import {UserRoundPlus,  DoorClosedCog} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);
  const [joinMessage, setJoinMessage] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

async function handleCreateRoom() {
  
  if (!roomName.trim()){
    setCreatedRoom(`Room not created due to no name`);
    return;
  }
 
try {
    const res = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: roomName.trim() }),
    });
    const data = await res.json();

    if (!res.ok) {
      setCreatedRoom(data.error || 'Could not create the room');
      return;
    }

    localStorage.setItem(`hostToken:${data.code}`, data.hostToken);
    navigate(`/room/${data.code}`);
  } catch {
    setCreatedRoom('Could not reach the server');
  }
}

async function handleJoinRoom(){

   const code = roomCode.trim().toUpperCase();
   const name = userName.trim();

   
 if (!code) {
  setJoinMessage("Please enter a room code");
  return;
}

 if (!name) {
  setJoinMessage("Please enter your name");
  return;
}

  
 try {
    const res = await fetch(`/api/rooms/${code}`);

    if (res.status === 404) {
      setJoinMessage(`Room not found`);
      return;
    }

    if (!res.ok) {
      setJoinMessage(`Something went wrong`);
      return;
    }

    const data = await res.json();
    navigate(`/room/${data.code}/${encodeURIComponent(name)}`);
  } catch {
    setJoinMessage(`Could not reach the server`);
  }
}


  return (
    <div className='main-app'>
      <h1>KantaKo 🎤</h1>
      <p>Your videoke night, on your phone.</p>
      <div className='room'>
        <div className='card'>
          <DoorClosedCog size={100} color='#CC7F3B'/>
          <div className="create-room">Create Room</div>
          <input 
            value={roomName}
            onChange={(e) => 
            setRoomName(e.target.value)}
            placeholder="Room Name" />
            <button  onClick={handleCreateRoom}>Create Room</button>
            {createdRoom && <p className='message'>{createdRoom}</p>}
      </div>
      <div className='card'>
          
          <UserRoundPlus size={100} color='#CC7F3B' />
          <div className="join-room">Join Room</div>
          <input 
            value={roomCode}
            onChange={(e) => 
            setRoomCode(e.target.value)}
            placeholder="Room Code" />

            <input 
            value={userName}
            onChange={(e) => 
            setUserName(e.target.value)}
            placeholder="Your Name"
            maxLength={30} />

            <button onClick={handleJoinRoom}>Join Room</button>
            {joinMessage && <p className='message'>{joinMessage}</p>}

      </div>
      </div>
    </div>
  )}
export default Home
