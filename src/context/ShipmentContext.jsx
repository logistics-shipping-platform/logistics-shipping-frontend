import React, { createContext, useContext, useState } from 'react';

export const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {

  const [selectedShipment, setSelectedShipment] = useState(null);
  const [calculatedShipmentData, setCalculatedShipmentData] = useState(null);
  const [cities, setCities] = useState([]);

  const updateSelectedShipment = (data) => {
    setSelectedShipment(data);
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
      selectedShipment,
      cities,
      updateSelectedShipment,
      updateCalculatedShipment,
      updateCities
    }}>
      {children}
    </ShipmentContext.Provider>
  );
};
