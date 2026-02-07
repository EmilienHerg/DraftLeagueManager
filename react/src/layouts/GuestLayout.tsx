import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/useStateContext";
import { AppShell, Button, Flex, useMantineTheme } from "@mantine/core";
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
        <AppShell padding="md" header={{ height: 60 }}>
            <AppShell.Header style={{ backgroundColor: theme.colors.gray[1] }}>
                <Flex h="100%" justify="flex-end" align="center" gap={"sm"} mr={"lg"}>
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
                </Flex>
            </AppShell.Header>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
