import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Projects from './pages/projects';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', margin: '0', padding: '0' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<div style={{padding: '2rem'}}><h1>Tasks (Coming Soon)</h1></div>} />
      </Routes>
    </div>
  );
}

export default App;