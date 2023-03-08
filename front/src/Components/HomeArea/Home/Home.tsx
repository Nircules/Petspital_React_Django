import { useContext } from "react";
import { UserContext } from "../../../Redux/UserContext";
import config from "../../../Utils/Config";

import "./Home.css";

function Home(): JSX.Element {
    const context = useContext(UserContext)

    return (
        <div className="Home">
            <h1>Petspital Home Page!</h1>
            <div className="Box">
                Welcome to Petspital store! <br />
                Here you can find all sorts of products for your beloved pets! <br />
                The website is on 24/7 and you can make an order whenever and wherever.
                <div className="bottom">
                    <img src={config.productImagesUrl + "/assets/general/images/HomeImage.png"} />
                </div>
            </div>
        </div>
    );
}

export default Home;
