import "./Header.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import SearchBar from "../../SharedArea/SearchBar/SearchBar";
import Cart from "../../CartArea/Cart/Cart";
import config from "../../../Utils/Config";
import { NavLink } from "react-router-dom";


function Header(): JSX.Element {
    const bg_img = config.productImagesUrl + "/assets/general/images/background.jpg"

    return (
        <div className="Header" style={{ backgroundImage: bg_img }}>
            <AuthMenu />
            <NavLink to="/home"><img src={config.productImagesUrl + "/assets/general/images/LogoPic.png"} /></NavLink>
            <SearchBar /><br />
            <Cart />
        </div>

    );
}

export default Header;
