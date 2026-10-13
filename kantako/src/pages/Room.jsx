import { useParams } from 'react-router-dom';
import '../App.css';

function Room() {
const { roomId } = useParams();
return(

<h1>Room Code: {roomId}</h1>

)}

export default Room