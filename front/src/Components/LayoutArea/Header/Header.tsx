import "./Header.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import SearchBar from "../../SharedArea/SearchBar/SearchBar";


function Header(): JSX.Element {

    return (
        <div className="Header">
            <AuthMenu />
            <h1>PETSPITAL</h1>
            <SearchBar />
        </div>

    );
}

export default Header;
