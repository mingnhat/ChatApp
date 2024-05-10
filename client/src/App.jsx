import {Routes, Route, Navigate} from 'react-router-dom'
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
const App = () => {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Chat/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
    </>
  )
}
 
export default App;