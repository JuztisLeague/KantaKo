import { useState } from 'react'
import './App.css'

function App() {
  const [roomName, setRoomName] = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);

function handleCreateRoom() {
  
  if (!roomName.trim()){
    setCreatedRoom(`Room not created due to no name`);
    return;
  }
    setCreatedRoom(`Room "${roomName}" created!`);
   
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
    </div>

  )}
export default App
