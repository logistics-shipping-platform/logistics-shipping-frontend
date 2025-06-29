import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ShipmentProvider } from './context/ShipmentContext';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <AuthProvider>
      <ShipmentProvider>
        <App />
      </ShipmentProvider>
    </AuthProvider>
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById('root')
)