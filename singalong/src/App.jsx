import { useState } from 'react'
import './App.css'

function App() {
  const [roomName, setRoomName] = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);

  return (
    <div>
      <h1>SingAlong 🎤</h1>
      <input 
      value={roomName}
      onChange={(e) => 
      setRoomName(e.target.value)}
      placeholder="Room Name" />
      <button  onClick={() => setCreatedRoom(`Room "${roomName}" created!`)}>Create Room</button>
     {createdRoom && <p>{createdRoom}</p>}
    </div>

  )}
export default App
