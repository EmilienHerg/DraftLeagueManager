import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/useStateContext";

export default function GuestLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to={"/"} />;
    }

    return (
        <div>
            <p>Guest Layout</p>
            <Outlet />
        </div>
    );
}
