import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/useStateContext";

export default function DefaultLayout() {
    const { token, theme, setTheme } = useStateContext();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div>
            <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
                {theme === "light" ? "Passer en sombre" : "Passer en clair"}
            </button>
            <p>Layout de base</p>
            <Outlet />
        </div>
    );
}
