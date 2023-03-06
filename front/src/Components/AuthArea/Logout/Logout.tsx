import "./Logout.css";
import { useContext, useEffect } from "react";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Redux/UserContext";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    const context = useContext(UserContext)

    useEffect(() => {
        authService.logout();
        context.user = null
        navigate("/login")
    }, [])
    return null;
}

export default Logout;
