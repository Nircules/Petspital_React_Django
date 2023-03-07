import { useContext } from "react";
import { UserContext } from "../../../Redux/UserContext";

import "./Home.css";

function Home(): JSX.Element {
    const context = useContext(UserContext)

    return (
        <div className="Home">
            <h1>Petspital Home Page!</h1>
            <h2>{context.user && context.user.username}</h2>
        </div>
    );
}

export default Home;
