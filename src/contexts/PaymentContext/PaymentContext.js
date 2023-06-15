import { createContext, useContext, useState } from 'react';

export const PaymentContext = createContext();

export default function PaymentProvider({children}) {
    const [paymentLog, setpaymentLog] = useState(null)
    return (
      <PaymentContext.Provider value={{
          paymentLog, 
          setpaymentLog,
         }}>
         {children}

      </PaymentContext.Provider>
    )
  }

  export const usePaymentContext = () => useContext(PaymentContext);




