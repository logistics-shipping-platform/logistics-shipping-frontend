import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


       <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
       
      </Route> 

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;