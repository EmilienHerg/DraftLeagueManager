import DraftList from "../components/DraftList";
import { useStateContext } from "../contexts/useStateContext";

export default function Dashboard() {
    const { user } = useStateContext();

    return (
        <>
            <DraftList user={user} />
        </>
    );
}
