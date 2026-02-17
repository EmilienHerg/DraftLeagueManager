import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/useStateContext";
import {
    AppShell,
    Center,
    Text,
    Stack,
    useMantineTheme,
    Group,
    Button,
} from "@mantine/core";
import { MdDashboard, MdSettings } from "react-icons/md";
import type { NavbarItem } from "../types/NavbarItem";
import axiosClient from "../axios-client";
import showSuccessNotification, {
    showErrorNotification,
} from "../utils/notifications";

export default function DefaultLayout() {
    const { token, setToken, user } = useStateContext();
    console.log(token);
    const theme = useMantineTheme();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    const logoutUser = async () => {
        try {
            const response = await axiosClient.post("/api/logout");
            setToken(null);
            showSuccessNotification(response.data.message);
        } catch (error: any) {
            showErrorNotification(error.response.data.message);
        }
    };

    const navbarMenus: NavbarItem[] = [
        {
            label: "Dashboard",
            icon: <MdDashboard size={20} />,
            link: "/dashboard",
        },
        {
            label: "Settings",
            icon: <MdSettings size={20} />,
            link: "/settings",
        },
    ];

    return (
        <AppShell
            padding="md"
            navbar={{
                width: 300,
                breakpoint: "sm",
            }}
        >
            <AppShell.Header style={{ backgroundColor: theme.colors.gray[1] }}>
                <AppShell.Header
                    style={{ backgroundColor: theme.colors.gray[1] }}
                >
                    <Group justify="flex-end" gap={"sm"} mr={"lg"}>
                        <Button
                            variant="light"
                            color="cyan"
                            size="md"
                            radius="md"
                            my={"xs"}
                            onClick={logoutUser}
                        >
                            Déconnexion
                        </Button>
                    </Group>
                </AppShell.Header>
            </AppShell.Header>

            <AppShell.Navbar>
                {user && (
                    <Stack gap={0} align="flex-end">
                        <Text size="sm" fw={700}>
                            {user.pseudo}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {user.email}
                        </Text>
                    </Stack>
                )}
                <Center>
                    <Text
                        size="lg"
                        fw={900}
                        variant="gradiant"
                        gradient={{ from: "grape", to: "blue", deg: 90 }}
                        py={"sm"}
                    >
                        Titre
                    </Text>
                </Center>
                <Stack justify="center" gap={0}>
                    {navbarMenus.map((menu) => (
                        <Center>
                            <a
                                href={menu.link}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {menu.label}
                            </a>
                        </Center>
                    ))}
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
