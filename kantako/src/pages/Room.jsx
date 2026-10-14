import { useParams, useLocation } from 'react-router-dom';
import '../App.css';

function Room() {
const { roomId } = useParams();
const location = useLocation();

const name = location.state?.roomName || "Unnamed room";
return(
    <div>
        <h1> {name} </h1>
        <p>Room Code: {roomId}</p>
    </div>


)}export default Room