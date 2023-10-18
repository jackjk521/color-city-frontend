import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState(null);

  const updateUserCredentials = (credentials) => {
    setUserCredentials(credentials);
  };

  return (
    <UserContext.Provider value={{ userCredentials, updateUserCredentials }}>
      {children}
    </UserContext.Provider>
  );
};