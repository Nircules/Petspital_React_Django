import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { UserContext } from "../../../Redux/UserContext";
import jwtDecode from "jwt-decode";
import authFunctions from "../../../Services/AuthFunctions";

interface TokenPayload {
    user_id: number;
}

function Login(): JSX.Element {
    const context = useContext(UserContext)
    const { register, handleSubmit } = useForm<UserModel>()
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState('')

    async function send(credentials: UserModel) {
        try {
            setFormErrors('')
            await authFunctions.login(credentials)
                .then(response => {
                    const accessToken = JSON.parse(localStorage.getItem('tokens')).access;
                    const container = jwtDecode<TokenPayload>(accessToken);
                    authFunctions.getUserById(container.user_id)
                        .then(user => { context.user = user })
                        .then(() => navigate("/home"))
                })
        } catch (err: any) {
            setFormErrors(err.message)
        }
    }

    return (
        <div className="Login Box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(send)}>
                <div className="form-floating">
                    <input type="text" className="form-control" {...register("username")} />
                    <label>Username</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" {...register("password")} />
                    <label>Password</label>
                </div>
                {formErrors && <span style={{ color: 'red' }}>{formErrors}</span>}
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
