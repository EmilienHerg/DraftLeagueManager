import { StateContext } from "./StateContext";
import { useState, type ReactNode } from "react";

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {

    // user state
    const [user, _setUser] = useState<any>(() => {
        const user = localStorage.getItem("USER_DATA");
        return user ? JSON.parse(user) : null;
    });

    // token state
    const [token, _setToken] = useState<string | null>(
        localStorage.getItem("ACCESS_TOKEN"),
    );
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const setUser = (user: any) => {
        _setUser(user);
        if (user) {
            localStorage.setItem("USER_DATA", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER_DATA");
        }
    };

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    // setTheme : à implémenter

    return (
        <StateContext.Provider
            value={{ user, token, theme, setUser, setToken, setTheme }}
        >
            {children}
        </StateContext.Provider>
    );
};
