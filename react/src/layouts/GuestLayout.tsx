import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/useStateContext";
import {
    AppShell,
    Button,
    Group,
    Text,
    Box,
    useMantineTheme,
    rem,
} from "@mantine/core";
import type { HeaderButtons } from "../types/HeaderButtons";

export default function GuestLayout() {
    const { token } = useStateContext();
    const theme = useMantineTheme();

    // Si l'utilisateur est déjà connecté, on le redirige vers le dashboard
    if (token) {
        return <Navigate to={"/dashboard"} />;
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
        <AppShell 
            header={{ height: 70 }} 
            padding="md"
        >
            <AppShell.Header px="md" style={{ borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}` }}>
                <Group h="100%" justify="space-between" maw={1200} mx="auto">
                    <Text
                        size="xl"
                        fw={900}
                        component={Link}
                        to="/"
                    >
                        DRAFT APP
                    </Text>

                    <Group gap="sm">
                        {headerButtons.map((button) => (
                            <Button
                                key={button.text}
                                component={Link}
                                to={button.link}
                                variant="subtle"
                                color="blue"
                                radius="md"
                            >
                                {button.text}
                            </Button>
                        ))}
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Main bg={theme.colors.gray[0]}>
                <Box 
                    style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box maw={450} w="100%" mx="auto">
                        <Outlet />
                    </Box>
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}