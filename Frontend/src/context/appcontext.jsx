import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activities, setActivities] = useState([]);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        activities,
        setActivities,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
