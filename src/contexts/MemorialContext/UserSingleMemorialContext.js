import { createContext, useContext, useState } from 'react';

export const UserSingleMemorialContext = createContext();

export default function UserSingleMemorialProvider({children}) {
    const [user_memorial, setUser_memorial] = useState(null)
    return (
      <UserSingleMemorialContext.Provider value={{
            user_memorial,
            setUser_memorial
         }}>
         {children}

      </UserSingleMemorialContext.Provider>
    )
  }

  export const useUserSingleMemorialContext = () => useContext(UserSingleMemorialContext);




