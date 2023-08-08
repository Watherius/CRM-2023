import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const ShowStatementStage = createContext(null);

export const AppProvider = ({ children }) => {
  const storedValue = localStorage.getItem('StatementStage');
  const [showStatementStage, setShowStatementStage] = useState(storedValue ?? false);
  return (
    <ShowStatementStage.Provider value={{ showStatementStage, setShowStatementStage }}>
      {children}
    </ShowStatementStage.Provider>
  );
};