import { useEffect } from "react";
import "./App.css";
import {useNavigate, Routes, Route} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken()
  },[])

  const verifyToken = () => {
    const token = localStorage.getItem('token');
    if(token) console.log('il y a un token')
    else {
      navigate("/login")
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
