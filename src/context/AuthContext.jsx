import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    // Verifica si hay un token guardado en localStorage al cargar el componente
    const saved = localStorage.getItem('authToken');
    if (saved) {
      // Si hay un token guardado, actualiza el estado de autenticación
      setToken(saved);
      setIsAuthenticated(true);
    }
  }, []);

  /* 
   * Prepara todo el contexto de autenticación luego de iniciar sesión.
   */
  const login = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  /*   
  * Elimina el token de autenticación y actualiza el estado de autenticación.
  */
  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      token,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};