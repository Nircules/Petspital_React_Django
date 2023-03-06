import { useContext, useEffect } from "react";
import { UserContext } from "../../../Redux/UserContext";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Clock from "../Clock/Clock";
import Sales from "../Sales/Sales";

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
