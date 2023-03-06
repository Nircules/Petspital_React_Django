import "./AuthMenu.css";
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../Redux/UserContext";
import UserModel from "../../../Models/UserModel";
import { useLocation } from 'react-router-dom';

function AuthMenu(): JSX.Element {

    const { pathname } = useLocation();
    const context = useContext(UserContext);
    const [user, setUser] = useState<UserModel | undefined>(context.user)
    useEffect(() => {
        setUser(context.user);
    }, [pathname])

    return (
        <div className="AuthMenu">
            {!user && <div>
                <span> Welcome | </span>
                <NavLink to="/login">Login</NavLink> <span> | </span>
                <NavLink to="/register">Register</NavLink>
            </div>}

            {user && <div>
                <span>Welcome {user.username.toUpperCase()} | </span>
                <NavLink to="/logout">Logout</NavLink>
            </div>}
        </div>
    );
}
export default AuthMenu;
