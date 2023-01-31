import "./Logout.css";
import {useEffect} from "react";
import authService from "../../../Services/AuthService";
import {useNavigate} from "react-router-dom";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        authService.logout();
        navigate("/login")
    }, [])
    return null;
}

export default Logout;
