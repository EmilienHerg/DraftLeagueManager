import { createContext } from "react";

interface StateContext {
  user: any;
  token: string | null;
  theme: "light" | "dark";
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const StateContext = createContext<StateContext>({
  user: null,
  token: null,
  theme: "light",
  setUser: () => {},
  setToken: () => {},
  setTheme: () => {}
});
