import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [formStepperData, setFormStepperData] = useState(null);
  const [signature, setSignature] = useState(null);
  const [hasSignature, setHasSignature] = useState(true);
  const [userBio, setUserBio] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        formStepperData,
        setFormStepperData,
        signature,
        setSignature,
        hasSignature,
        setHasSignature,
        userBio,
        setUserBio,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
