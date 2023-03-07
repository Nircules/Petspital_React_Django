import "./AuthMenu.css";
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../Redux/UserContext";
import UserModel from "../../../Models/UserModel";
import { useLocation } from 'react-router-dom';
import UserProfileModel from "../../../Models/UserProfileModel";
import authFunctions from "../../../Services/AuthFunctions";

function AuthMenu(): JSX.Element {

    const { pathname } = useLocation();
    const context = useContext(UserContext);
    const [user, setUser] = useState<UserModel | undefined>(context.user)
    const [profile, setProfile] = useState<UserProfileModel>()

    useEffect(() => {
        setUser(context.user);
        if (context.user) {
            authFunctions.getUserProfileById(context.user.id)
                .then(response => setProfile(response));
        }
    }, [pathname])

    return (
        <div className="AuthMenu">
            {!user && <div>
                <span> Welcome | </span>
                <NavLink to="/login">Login</NavLink> <span> | </span>
                <NavLink to="/register">Register</NavLink>
            </div>}

            {user && profile && <div>
                <span>Welcome {!profile.first_name ? user.username.toUpperCase() : profile.first_name} | </span>
                <NavLink to={"/user_profile/" + profile.id}>Profile | </NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </div>}
        </div>
    );
}
export default AuthMenu;
