import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [formStepperData, setFormStepperData] = useState(null);
  const [signature, setSignature] = useState(null);

  return (
    <GlobalContext.Provider value={{ formStepperData, setFormStepperData, signature, setSignature }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
