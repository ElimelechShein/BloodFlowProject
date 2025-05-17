// DataContext.js
import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataFor2, setDataFor2] = useState(""); // מידע מ-1 ל-2

  return (
    <DataContext.Provider
      value={{
        dataFor2,
        setDataFor2
      }}
    >
      {children}
    </DataContext.Provider>
  );
};


export const useDataContext = () => {
  return useContext(DataContext);
};
