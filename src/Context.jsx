import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [data, setData] = useState(null);
  const [signature, setSignature] = useState(null);
  return (
    <GlobalContext.Provider value={{ data, setData, signature, setSignature }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
