import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import type { Draft } from "../types/Draft";

export default function DraftCard({ draft } : { draft: Draft}) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{draft.name}</Text>
                <Badge color="pink">{draft.pokemonNb}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                With Fjord Tours you can explore more of the magical fjord
                landscapes with tours and activities on and around the fjords of
                Norway
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
            </Button>
        </Card>
    );
}
