import { createContext, useContext, useState } from 'react';

const ExploreFilterContext = createContext();

export const ExploreFilterProvider = ({ children }) => {
  const [friendsOnly, setFriendsOnly] = useState(false);
  return (
    <ExploreFilterContext.Provider value={{ friendsOnly, setFriendsOnly }}>
      {children}
    </ExploreFilterContext.Provider>
  );
};

export const useExploreFilter = () => useContext(ExploreFilterContext);