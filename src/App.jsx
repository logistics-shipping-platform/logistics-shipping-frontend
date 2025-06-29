import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import RequestQuote from './pages/request-quote/RequestQuote';
import CreateShipment from './pages/create-shipment/CreateShipmnet';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


       <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<RequestQuote />} />
        <Route path="request-quote" element={<RequestQuote />} />
        <Route path="create-shipment" element={<CreateShipment />} />
      </Route> 

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;