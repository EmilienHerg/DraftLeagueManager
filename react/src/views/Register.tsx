import { useForm } from "@mantine/form";
import type { RegisterFormType } from "../types/FormTypes";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { CiAt } from "react-icons/ci";
import axiosClient from "../axios-client";
import showSuccessNotification, {
    showErrorNotification,
} from "../utils/notifications";
import { useState } from "react";

export default function Register() {

    // Gère l'état du bouton Enregistrer lors de la création de l'utilisateur
    const [isLoading, setIsLoading] = useState(false);

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

    // Méthode qui enregistre un nouvel utilisateur
    const registerUser = async (values: RegisterFormType) => {
        try {
            setIsLoading(true);
            const response = await axiosClient.post("/api/register", values);
            showSuccessNotification(response.data.message);
            setIsLoading(false);
        } catch (error: any) {
            showErrorNotification(error.response.data.message);
            setIsLoading(false);
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
            <Button disabled={isLoading} mt="sm" type="submit">
                Enregistrer
            </Button>
        </form>
    );
}
