import "./Header.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { NavLink } from "react-router-dom";
import { useState } from "react";


function Header(): JSX.Element {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const isActiveStyle = {
        textDecoration: 'none',
        color: 'red'
    };

    return (
        <div className="Header">
            <AuthMenu />
            <h1>My First App!</h1>
        </div>

    );
}

export default Header;
