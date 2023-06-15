import { createContext, useContext, useState } from "react";

const PlanContext = createContext({});

const PlanContextProvider = ({ children }) => {

    const [NGNPlan, setNGNPlan] = useState([])
    const [AUDPlan, setAUDPlan] = useState([])
    return (
        <PlanContext.Provider value={{NGNPlan, setNGNPlan, AUDPlan, setAUDPlan}}>
          {children}
        </PlanContext.Provider>
      );
}
export default PlanContextProvider;

export const usePlanContext = () => useContext(PlanContext);
