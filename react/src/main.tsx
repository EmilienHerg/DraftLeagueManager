import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { ContextProvider } from "./contexts/ContextProvider.tsx";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
const appTheme = createTheme({
    fontFamily: "Verdana, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    headings: { fontFamily: "Outfit, sans-serif" },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider theme={appTheme}>
            <Notifications />
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </MantineProvider>
    </StrictMode>,
);
