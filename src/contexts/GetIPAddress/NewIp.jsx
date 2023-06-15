import { createContext, useContext, useState } from "react";

export const IPContext = createContext();

export default function IPProvider({ children }) {
  const [getallips, setallips] = useState();

  return (
    <IPContext.Provider
      value={{
        getallips,
        setallips,
      }}
    >
      {children}
    </IPContext.Provider>
  );
}
