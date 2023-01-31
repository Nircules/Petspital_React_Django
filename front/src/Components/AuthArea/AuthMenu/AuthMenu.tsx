import "./AuthMenu.css";
import userModel from "../../../Models/UserModel";
import {useEffect, useState} from "react";
import {authStore} from "../../../Redux/AuthStore";
import {Navigate, NavLink} from "react-router-dom";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<userModel>();
    useEffect(() => {
        setUser(authStore.getState().user)
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user)
        })

        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className="AuthMenu">
            {!user && <div>
                <span> Welcome | </span>
                <NavLink to="/login">Login</NavLink> |
                <NavLink to="/register">Register</NavLink>
            </div>}

            {user && <div>
                <span>Welcome {user.firstName} {user.lastName} | </span>
                <NavLink to="/logout">Logout</NavLink>
            </div>}
        </div>
    );
}

export default AuthMenu;
