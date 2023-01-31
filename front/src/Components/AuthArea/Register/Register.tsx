import "./Register.css";
import {useForm} from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import {useNavigate} from "react-router-dom";

function Register(): JSX.Element {
    const {register, handleSubmit} = useForm<UserModel>()
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            alert("Welcome!");
            navigate("/home");
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div className="Register Box">
            <form onSubmit={handleSubmit(send)}>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" {...register("firstName")}/>
                    <label>First Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" {...register("lastName")}/>
                    <label>Last Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" {...register("username")}/>
                    <label>Username</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" {...register("password")}/>
                    <label>Password</label>
                </div>

                <button className="btn btn-primary">Submit</button>
            </form>

        </div>
    );
}

export default Register;
