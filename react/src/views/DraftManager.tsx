import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { showErrorNotification } from "../utils/notifications";
import { Skeleton } from "@mantine/core";
import type { Draft } from "../types/Draft";

export default function DraftManager() {
    const { token } = useParams();
    const [draft, setDraft] = useState<Draft| null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDraft = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/api/draft/${token}`);
                setDraft(response.data.data);
            } catch (error: any) {
                showErrorNotification(error.response.data.message);
                navigate("/dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDraft();
    }, [token, navigate]);

    return (
        <>
            {loading ? (
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            ) : (
                <div>
                    {draft && (
                        <div>
                            <h1>Gestion de la Draft "{draft.name}"</h1>
                            <p>
                                Le token récupéré est : <strong>{token}</strong>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
