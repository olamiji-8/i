import { createContext, useContext, useState } from 'react';

export const TributeContext = createContext();

export default function TributeProvider({children}) {
    const [tributes, settributes] = useState(null)
    return (
      <TributeContext.Provider value={{
          tributes, 
          settributes,
         }}>
         {children}

      </TributeContext.Provider>
    )
  }

  export const useTributeContext = () => useContext(TributeContext);




