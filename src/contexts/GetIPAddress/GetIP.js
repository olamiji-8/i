import { createContext, useContext, useState } from 'react';

export const GetIPContext = createContext();

export default function IPProvider({children}) {
    const [ip, setIP] = useState(null)
    return (
      <GetIPContext.Provider value={{
        ip, setIP
         }}>
         {children}

      </GetIPContext.Provider>
    )
  }

  export const useGetIPContext = () => useContext(GetIPContext);




