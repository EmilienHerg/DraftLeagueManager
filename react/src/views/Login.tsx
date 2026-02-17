import { useForm } from "@mantine/form";
import type { LoginFormType } from "../types/FormTypes";
import axiosClient from "../axios-client";
import showSuccessNotification, { showErrorNotification } from "../utils/notifications";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { CiAt } from "react-icons/ci";
import { useStateContext } from "../contexts/useStateContext";

export default function Login() {
    const { setToken, setUser } = useStateContext();

    const loginForm = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Email invalide",
        },
    });

    const loginUser = async (values: LoginFormType) => {
        try {
            await axiosClient.get("/sanctum/csrf-cookie");
            const response = await axiosClient.post("/api/login", values);
            if (response.data.token) {
                setToken(response.data.token)
            }

            if (response.data.user) {
                setUser(response.data.user);
            }
            showSuccessNotification(response.data.message);
        } catch (error: any) {
            showErrorNotification(error.response.data.message);
        }
    };

    return (
        <>
            <form
                onSubmit={loginForm.onSubmit((values: LoginFormType) =>
                    loginUser(values),
                )}
            >
                <TextInput
                    mt="sm"
                    withAsterisk
                    label="Email"
                    placeholder="Votre email"
                    leftSectionPointerEvents="none"
                    leftSection={<CiAt />}
                    {...loginForm.getInputProps("email")}
                />
                <PasswordInput
                    mt="sm"
                    withAsterisk
                    label="Mot de passe"
                    placeholder="Votre mot de passe"
                    {...loginForm.getInputProps("password")}
                />
                <Button mt="sm" type="submit">
                    Se connecter
                </Button>
            </form>
        </>
    );
}
