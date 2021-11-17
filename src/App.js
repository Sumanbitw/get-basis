import React from 'react';
import './App.css';
import Login from './features/authentication/Login';
import { Routes, Route } from "react-router"
import Signup from './features/authentication/Signup';
import Profile from './features/authentication/Profile';
import VerifyOTP from './features/authentication/VerifyOTP';


  /*
  1.Login
  2.verify
  3.signup isLogin=false
  4.profile
  5.logout
  */


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/verify" element={<VerifyOTP/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </div>
  );
}

export default App;
