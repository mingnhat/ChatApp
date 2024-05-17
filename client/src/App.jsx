import {Routes, Route, Navigate} from 'react-router-dom'
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

const App = () => {
  const {user} = useContext(AuthContext);
  return (
    // ensure that userChats is always an array and handle errors more effectively.
    <ChatContextProvider user = {user}>
    <NavBar/>
    <Routes>
      <Route path="/" element={user ? <Chat/> : <Login/>} />
      <Route path="/login" element={user ? <Chat/> : <Login/>} />
      <Route path="/register" element={user ? <Chat/> : <Register/>} />
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
    </ChatContextProvider>
  )
}
 
export default App;