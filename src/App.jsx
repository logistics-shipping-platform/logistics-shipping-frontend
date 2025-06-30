import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import RequestQuote from './pages/request-quote/RequestQuote';
import CreateShipment from './pages/create-shipment/CreateShipmnet';
import ShipmentList from './pages/track-shipment/ShipmentList';
import ShipmentDetail from './pages/track-shipment/ShipmentDetail';

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas Protegidas */}
       <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<RequestQuote />} />
        <Route path="request-quote" element={<RequestQuote />} />
        <Route path="create-shipment" element={<CreateShipment />} />
        <Route path="track-shipment" element={<ShipmentList />} />
        <Route path="track-shipment/:id" element={<ShipmentDetail />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;