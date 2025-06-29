import React, { createContext, useContext, useState } from 'react';

export const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {

  const [shipmentData, setShipmentData] = useState(null);
  const [calculatedShipmentData, setCalculatedShipmentData] = useState(null);
  const [cities, setCities] = useState([]);

  const updateShipment = (data) => {
    setShipmentData(data);
  };

  const updateCalculatedShipment = (data) => {
    setCalculatedShipmentData(data);
  };

  const updateCities = (data) => {
    setCities(data);
  };

  return (
    <ShipmentContext.Provider value={{
      calculatedShipmentData,
      shipmentData,
      cities,
      updateShipment,
      updateCalculatedShipment,
      updateCities
    }}>
      {children}
    </ShipmentContext.Provider>
  );
};
