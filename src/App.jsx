import { useState } from 'react'
import Login from './Components/login'
import Dashboard from './Components/Dashboard'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard username={username} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App
