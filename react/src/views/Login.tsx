import { useForm } from "@mantine/form";
import type { LoginFormType } from "../types/FormTypes";
import axiosClient from "../axios-client";
import showSuccessNotification from "../utils/notifications";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { CiAt } from "react-icons/ci";

export default function Login() {
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
            const response = await axiosClient.post("/api/login", values);
            showSuccessNotification(response.data.message);
        } catch (error: any) {
            showSuccessNotification(error.response.data.message);
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
