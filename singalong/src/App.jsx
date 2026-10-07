import { useState } from 'react'
import './App.css'

function App() {
  const [roomName, setRoomName] = useState("");

  return (
    <div>
      <h1>SingAlong 🎤</h1>
      <input 
      value={roomName}
      onChange={(e) => setRoomName(e.target.value)}
      placeholder="Room Name" />
    </div>

  )}
export default App
