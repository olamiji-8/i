import { createContext, useContext, useState } from 'react';

export const StoryContext = createContext();

export default function StoryProvider({children}) {
    const [stories, setStories] = useState(null)
    return (
      <StoryContext.Provider value={{
          stories, 
          setStories,
         }}>
         {children}

      </StoryContext.Provider>
    )
  }

  export const useStoryContext = () => useContext(StoryContext);




