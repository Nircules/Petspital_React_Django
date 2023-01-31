import ProductModel from "../../../Models/ProductModel";
import "./Header.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu/>
            <h1>My First App!</h1>
        </div>
    );
}

export default Header;
