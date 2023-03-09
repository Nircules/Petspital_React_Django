import "./Header.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import SearchBar from "../../SharedArea/SearchBar/SearchBar";
import Cart from "../../CartArea/Cart/Cart";
import config from "../../../Utils/Config";
import { NavLink, useNavigate } from "react-router-dom";


function Header(): JSX.Element {
    const bg_img = config.productImagesUrl + "/assets/general/images/background.jpg"

    const navigate = useNavigate()

    function homeLogo() {
        navigate('/home')
    }


    return (
        <div className="Header" style={{ backgroundImage: bg_img }}>
            <AuthMenu />
            <img src={config.productImagesUrl + "/assets/general/images/LogoPic.png"} onClick={homeLogo} />
            <SearchBar /><br />
            <Cart />
        </div>

    );
}

export default Header;
