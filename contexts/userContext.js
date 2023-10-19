import { useRouter } from "next/router";
import {redirect} from 'next/navigation'
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState([]);
  const updateUserCredentials = (credentials) => {
    setUserCredentials(credentials);
  };

  // Logout after 1-min of inactivity
  useEffect(() => {
    let timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        router.replace("/login");
        console.log("Timeout completed");

        // Clear the userCredentials state
        setUserCredentials(null);
      }, 600000); // 10 minutes in milliseconds
    };

    try {
      // Check if the current path is not "/login"
      if (router.pathname !== "/login") {
        const events = [
          "mousedown",
          "mousemove",
          "keypress",
          "scroll",
          "touchstart",
        ];
        events.forEach((event) => {
          document.addEventListener(event, resetTimeout);
        });

        resetTimeout();

        return () => {
          clearTimeout(timeout);
          events.forEach((event) => {
            document.removeEventListener(event, resetTimeout);
          });
        };
      }
    } catch (error) {
      console.error("Error in Early render in UserProvider", error);
      // Handle the error here, e.g., show an error message or perform any necessary actions
    }
  }, [router]);


  const contextValue = {
    user: {
      userCredentials,
      setUserCredentials,
      updateUserCredentials,
    },
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
