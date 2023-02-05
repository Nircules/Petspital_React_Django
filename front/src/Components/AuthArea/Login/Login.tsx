import "./Login.css";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import authService from "../../../Services/AuthService";
import CredentialsModel from "../../../Models/CredentialsModel";

function Login(): JSX.Element {
    const {register, handleSubmit} = useForm<CredentialsModel>()
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            navigate("/home");
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div className="Login Box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(send)}>
                <div className="form-floating">
                    <input type="text" className="form-control" {...register("username")}/>
                    <label>Username</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" {...register("password")}/>
                    <label>Password</label>
                </div>

                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
