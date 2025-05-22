import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import { useAtomValue } from 'jotai';
import { loggedInUserDetails } from './helpers/atoms';


function App() {
  const loggedInUser = useAtomValue(loggedInUserDetails)
  return (
    <>
      {!loggedInUser ? (
        <Login />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App
