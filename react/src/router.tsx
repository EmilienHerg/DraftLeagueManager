import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import GuestLayout from "./layouts/GuestLayout";
// import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./views/Dashboard";
import Main from "./views/Main";
import DefaultLayout from "./layouts/DefaultLayout";
import DraftManager from "./views/DraftManager";

const router = createBrowserRouter([
    {
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Main />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/draft/:token",
                element: <DraftManager />
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
