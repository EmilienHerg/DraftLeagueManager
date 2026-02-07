import { useForm } from "@mantine/form";
import type { RegisterFormType } from "../types/RegisterFormType";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { CiAt } from "react-icons/ci";
import axiosClient from "../axios-client";
import showSuccessNotification from "../utils/notifications";

export default function Register() {
    const registerForm = useForm({
        mode: "uncontrolled",
        initialValues: {
            pseudo: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        validate: {
            pseudo: (value) =>
                value.length <= 0
                    ? "Pseudo invalide"
                    : value.length > 20
                      ? "Le pseudo doit faire maximum 20 caractères"
                      : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Email invalide",
            password: (value) =>
                value.length < 8
                    ? "Veuillez saisir un mot de passe valide"
                    : null,
            password_confirmation: (value, values) =>
                value !== values.password
                    ? "Les mots de passe ne correspondent pas"
                    : null,
        },
    });

    const registerUser = async (values: RegisterFormType) => {
        try {
            const response = await axiosClient.post("/api/register", values);
            console.log(response.data);
            showSuccessNotification("Bravo");
        } catch (error: any) {
            console.error(error.response?.data);
        }
    };

    return (
        <form
            onSubmit={registerForm.onSubmit((values: RegisterFormType) =>
                registerUser(values),
            )}
        >
            <TextInput
                withAsterisk
                label="Pseudo"
                placeholder="Votre pseudo"
                {...registerForm.getInputProps("pseudo")}
            />
            <TextInput
                mt="sm"
                withAsterisk
                label="Email"
                placeholder="Votre email"
                leftSectionPointerEvents="none"
                leftSection={<CiAt />}
                {...registerForm.getInputProps("email")}
            />
            <PasswordInput
                mt="sm"
                withAsterisk
                label="Mot de passe"
                placeholder="Votre mot de passe"
                {...registerForm.getInputProps("password")}
            />
            <PasswordInput
                mt="sm"
                withAsterisk
                label="Confirmation du mot de passe"
                placeholder="Confirmation du mot de passe"
                {...registerForm.getInputProps("password_confirmation")}
            />
            <Button mt="sm" type="submit">
                Enregistrer
            </Button>
            <Button onClick={() => showSuccessNotification("Bravo")}>
                Show notification
            </Button>
        </form>
    );
}
