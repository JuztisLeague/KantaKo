import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="main-app">
      <h1> Page not found </h1>
      <p>Please input the right Room code.</p>
      <Link to="/">Back</Link>
    </div>
  );
}

export default NotFoundPage;