import { useState } from 'react';
import {UserRoundPlus,  DoorClosedCog} from 'lucide-react';
import generateRoomCode from '../utils/generateRoomCode';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);
  const [joinMessage, setJoinMessage] = useState(null);
   const navigate = useNavigate();
function handleCreateRoom() {
  
  if (!roomName.trim()){
    setCreatedRoom(`Room not created due to no name`);
    return;
  }
 
  const code = generateRoomCode();
  navigate(`/room/${code}`, { state: { roomName } });
}

function handleJoinRoom(){

 if (!roomCode.trim()) {
  setJoinMessage("Please enter a room code");
  return;
}
  // TEMP: only checks the length until the backend can verify real rooms
  const code = roomCode.trim().toUpperCase();
  if (code.length !== 6) {
  setJoinMessage(`Invalid Room Code`);
  return;
 }
 navigate(`/room/${code}`);
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
            <button onClick={handleJoinRoom}>Join Room</button>
            {joinMessage && <p className='message'>{joinMessage}</p>}
      </div>
      </div>
    </div>
  )}
export default Home
