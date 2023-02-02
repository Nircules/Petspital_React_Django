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
            {/* <AuthMenu/>
            <h1>My First App!</h1> */}
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink to="/" className="nav-logo">
                        WeGotYou
                        <i className="fas fa-code"></i>
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                style={({ isActive }) => isActive ? isActiveStyle : {}}
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                style={({ isActive }) => isActive ? isActiveStyle : {}}
                                className="nav-links"
                                onClick={handleClick}
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/blog"
                                style={({ isActive }) => isActive ? isActiveStyle : {}}
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Blog
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/quiz"
                                style={({ isActive }) => isActive ? isActiveStyle : {}}
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Quiz
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                style={({ isActive }) => isActive ? isActiveStyle : {}}
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </div>

    );
}

export default Header;
