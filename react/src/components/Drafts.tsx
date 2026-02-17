import type { User } from "../types/User";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import type { Draft } from "../types/Draft";
import { Skeleton } from "@mantine/core";
import DraftCard from "./DraftCard";

export default function Drafts({ user }: { user: User }) {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get("/drafts");
                setDrafts(response.data.data);
            } catch (error) {
                console.error("Failed to fetch drafts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDrafts();
    }, []);

    return (
        <>
            {user && (
                <div>
                    <h2>Drafts de : {user.pseudo}</h2>

                    {loading ? (
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    ) : (
                        <div>
                            {drafts.map((draft) => (
                                <DraftCard draft={draft} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
