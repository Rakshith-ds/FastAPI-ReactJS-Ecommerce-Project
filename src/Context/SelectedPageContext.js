import React, { createContext, useState, useContext } from "react";

// Create a context
const SelectedPageContext = createContext();

// Custom hook to use the context
export const useSelectedPage = () => useContext(SelectedPageContext);

// Provider component
export const SelectedPageProvider = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState("All");

  return (
    <SelectedPageContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </SelectedPageContext.Provider>
  );
};
