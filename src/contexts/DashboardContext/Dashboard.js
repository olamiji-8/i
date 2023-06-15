import { createContext, useContext, useState } from 'react';

export const DashboardContext = createContext();

export default function DashProvider({children}) {
    const [dashdata, setdashdata] = useState()
    const [menuClicked, setMenuClicked] = useState(false)
    return (
      <DashboardContext.Provider value={{
          dashdata, 
          setdashdata,
          menuClicked,
          setMenuClicked
         }}>
         {children}

      </DashboardContext.Provider>
    )
  }

  export const useDashboardContext = () => useContext(DashboardContext);




