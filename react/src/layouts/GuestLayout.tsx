import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/useStateContext";
import { AppShell, Button, Group, useMantineTheme } from "@mantine/core";
import type { HeaderButtons } from "../types/HeaderButtons";

export default function GuestLayout() {
    const { token } = useStateContext();

    const theme = useMantineTheme();
    const navigate = useNavigate();

    if (token) {
        return <Navigate to={"/"} />;
    }

    const headerButtons: HeaderButtons[] = [
        {
            text: "Inscription",
            link: "/register",
        },
        {
            text: "Connexion",
            link: "/login",
        },
    ];

    

    return (
        <AppShell padding="md">
            <AppShell.Header style={{ backgroundColor: theme.colors.gray[1] }}>
                <Group justify="flex-end" gap={"sm"} mr={"lg"}>
                    {headerButtons.map((button) => (
                        <Button
                            key={button.text}
                            variant="light"
                            color="cyan"
                            size="md"
                            radius="md"
                            my={"xs"}
                            onClick={() => navigate(button.link)}
                        >
                            {button.text}
                        </Button>
                    ))}
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
