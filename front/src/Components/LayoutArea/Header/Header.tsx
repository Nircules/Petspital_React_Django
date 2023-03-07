import "./Header.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import SearchBar from "../../SharedArea/SearchBar/SearchBar";
import Cart from "../../CartArea/Cart/Cart";


function Header(): JSX.Element {

    return (
        <div className="Header">
            <AuthMenu />
            <h1>PETSPITAL</h1>
            <SearchBar /><Cart></Cart>
        </div>

    );
}

export default Header;
