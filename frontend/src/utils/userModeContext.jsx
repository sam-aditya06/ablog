import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const UserContext = createContext({});

function setTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [mode, setMode] = useState((
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) ? 'dark' : 'light');

  setTheme();

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then((res) => {
        setUser(res.data);
        setIsReady(true);
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ isReady, user, setUser, mode, setMode }}>
      {children}
    </UserContext.Provider>
  );
}