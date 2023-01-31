import Clock from "../Clock/Clock";
import Sales from "../Sales/Sales";

import "./Home.css";

function Home(): JSX.Element {

    return (
        <div className="Home">
            {/* <Clock /> */}
            <Sales/>
        </div>
    );
}

export default Home;
