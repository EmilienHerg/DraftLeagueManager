import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/useStateContext";
import {
    AppShell,
    Text,
    Stack,
    useMantineTheme,
    Group,
    Button,
    NavLink,
    Box,
    Divider
} from "@mantine/core";
import { MdDashboard, MdSettings, MdLogout } from "react-icons/md";
import axiosClient from "../axios-client";
import showSuccessNotification, {
    showErrorNotification,
} from "../utils/notifications";

export default function DefaultLayout() {
    const { token, setToken, user } = useStateContext();
    const theme = useMantineTheme();
    const location = useLocation();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    const logoutUser = async () => {
        try {
            const response = await axiosClient.post("/api/logout");
            setToken(null);
            showSuccessNotification(response.data.message);
        } catch (error: any) {
            showErrorNotification(
                error?.response?.data?.message ||
                    "Erreur lors de la déconnexion",
            );
        }
    };

    const navbarMenus = [
        {
            label: "Dashboard",
            icon: <MdDashboard size="1.2rem" />,
            link: "/dashboard",
        },
        {
            label: "Settings",
            icon: <MdSettings size="1.2rem" />,
            link: "/settings",
        },
    ];

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{ width: 280, breakpoint: "sm" }}
            padding="md"
        >
            <AppShell.Header px="md">
                <Group h="100%" justify="space-between">
                    <Text
                        size="xl"
                        fw={900}
                    >
                        DRAFT APP
                    </Text>
                    <Button
                        variant="subtle"
                        color="gray"
                        leftSection={<MdLogout size={18} />}
                        onClick={logoutUser}
                    >
                        Déconnexion
                    </Button>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                {user && (
                    <Box mb="xl" px="xs">
                        <Stack gap={0}>
                            <Text size="sm" fw={700} c="blue.7">
                                {user.pseudo}
                            </Text>
                            <Text size="xs" c="dimmed" truncate>
                                {user.email}
                            </Text>
                        </Stack>
                        <Divider mt="md" />
                    </Box>
                )}
                <Stack gap="xs">
                    {navbarMenus.map((menu) => (
                        <NavLink
                            key={menu.link}
                            component={Link}
                            to={menu.link}
                            label={menu.label}
                            leftSection={menu.icon}
                            active={location.pathname === menu.link}
                            variant="light"
                            color="blue"
                            style={{ borderRadius: theme.radius.md }}
                            py="md"
                        />
                    ))}
                </Stack>
                <Box style={{ marginTop: "auto" }} pt="md">
                    <Divider mb="sm" variant="dotted" />
                    <Text size="xs" c="dimmed" ta="center">
                        Version 1.0.0
                    </Text>
                </Box>
            </AppShell.Navbar>
            <AppShell.Main bg={theme.colors.gray[0]}>
                <Box maw={1200} mx="auto" pt="lg">
                    <Outlet />
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}
