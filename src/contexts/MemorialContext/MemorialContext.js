import { createContext, useContext, useState } from 'react';

export const MemorialContext = createContext();

export default function MemorialProvider({children}) {
    const [memorial, setMemorial] = useState([])
    return (
      <MemorialContext.Provider value={{
            memorial,
            setMemorial
         }}>
         {children}

      </MemorialContext.Provider>
    )
  }

  export const useMemorialContext = () => useContext(MemorialContext);




