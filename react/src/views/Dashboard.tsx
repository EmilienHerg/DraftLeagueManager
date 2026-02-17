import Drafts from "../components/Drafts";
import { useStateContext } from "../contexts/useStateContext";

export default function Dashboard() {
    const { user } = useStateContext();

    return (
        <>
            <Drafts user={user} />
        </>
    );
}
