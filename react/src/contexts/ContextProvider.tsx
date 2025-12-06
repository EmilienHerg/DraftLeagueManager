import { StateContext } from "./StateContext";
import { useState, type ReactNode } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN")
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider value={{ user, token, theme, setUser, setToken, setTheme }}>
      {children}
    </StateContext.Provider>
  );
};
