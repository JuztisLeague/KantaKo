import { useParams } from 'react-router-dom';

function Guest() {
  const { roomId, userName } = useParams();

  return (
    <div className="main-app">
      <h1>Hi, {userName}!</h1>
      <p>Room code: {roomId}</p>
    </div>
  );
}

export default Guest;