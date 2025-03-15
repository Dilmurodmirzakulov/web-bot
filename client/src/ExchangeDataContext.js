// src/ExchangeDataContext.js
import React, { createContext, useState, useEffect } from "react";

export const ExchangeDataContext = createContext();

export const ExchangeDataProvider = ({ children }) => {
  // In a real app you might fetch this data from an API.
  const [data, setData] = useState(null);

  return (
    <ExchangeDataContext.Provider value={{ data, setData }}>
      {children}
    </ExchangeDataContext.Provider>
  );
};
