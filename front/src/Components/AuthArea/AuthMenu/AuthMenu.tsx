import "./AuthMenu.css";
import { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
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
                <Link to="/login">
                    <button className="button-29">Login</button>
                </Link> <span> | </span>
                <Link to="/register">
                    <button className="button-29 logout">Register</button>
                </Link>
            </div>}

            {user && profile && <div>
                <span>Hello, {!profile.first_name ? user.username.toUpperCase() : profile.first_name} | </span>
                <Link to={"/user_profile/" + profile.id}>
                    <button className="button-29">Profile</button>
                </Link> <span> | </span>
                <Link to="/logout">
                    <button className="button-29 logout">Logout</button>
                </Link>
            </div>}
        </div>
    );
}
export default AuthMenu;
