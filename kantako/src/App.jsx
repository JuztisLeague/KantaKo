import { useState } from 'react';
import {UserRoundPlus,  DoorClosedCog} from 'lucide-react';
import './App.css';

function App() {
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);
  const [joinMessage, setJoinMessage] = useState(null);

function handleCreateRoom() {
  
  if (!roomName.trim()){
    setCreatedRoom(`Room not created due to no name`);
    return;
  }
    setCreatedRoom(`Room "${roomName}" created!`);
}

function handleJoinRoom(){

 if (!roomCode.trim()) {
  setJoinMessage("Please enter a room code");
  return;
}
// TEMP: compares against the Create Room input until the backend exists
  if (roomCode.trim().toUpperCase() === roomName.trim().toUpperCase()) {
  setJoinMessage(`Joining ${roomName} ...`);
  return;
 }
 setJoinMessage(`Invalid Room Code`);
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
            {createdRoom && <p>{createdRoom}</p>}
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
            {joinMessage && <p>{joinMessage}</p>}
      </div>
      </div>
    </div>
  )}
export default App
