import { useState } from 'react'
import './App.css'

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
  if (roomCode.trim().toUpperCase() === roomName.toUpperCase()) {
  setJoinMessage(`Joining ${roomName} ...`);
  return;
 }
 setJoinMessage(`Invalid Room Code`);

 

}


  return (
    <div>
      <h1>SingAlong 🎤</h1>
      <input 
      value={roomName}
      onChange={(e) => 
      setRoomName(e.target.value)}
      placeholder="Room Name" />
      <button  onClick={handleCreateRoom}>Create Room</button>
     {createdRoom && <p>{createdRoom}</p>}

     <input 
      value={roomCode}
      onChange={(e) => 
      setRoomCode(e.target.value)}
      placeholder="Room Code" />
      <button onClick={handleJoinRoom}>Join Room</button>
      {joinMessage && <p>{joinMessage}</p>}
    </div>

  )}
export default App
