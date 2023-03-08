import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import authFunctions from "../../../Services/AuthFunctions";
import { UserContext } from "../../../Redux/UserContext";

function Register(): JSX.Element {
    const { register, handleSubmit, formState, trigger } = useForm<UserModel>()
    const navigate = useNavigate();
    const context = useContext(UserContext)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const usernameRegex = /^[a-zA-Z0-9-_]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        trigger("password");
        setPasswordError("");
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        setPasswordError("");
    };

    async function send(user: UserModel) {
        if (password != confirmPassword) {
            setPasswordError("The two password fields didn't match.");
            return
        } else {
            setPasswordError("");
        }

        try {
            await authFunctions.register(user)
                .then(() => navigate("/login"))
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div className="Register Box">
            <h1>Register</h1>
            <form onSubmit={handleSubmit(send)}>
                <div className="form-floating">
                    <input type="text" className="form-control" {...register("username", {
                        required: { value: true, message: "User Name is required." },
                        minLength: { value: 3, message: "User Name Too Short." },
                        maxLength: { value: 22, message: "User Name Too Long." },
                        pattern: { value: usernameRegex, message: "Invalid Input." }
                    })} />
                    <label>Username</label>
                    <span> {formState.errors.username?.message}</span>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" {...register("password", {
                        required: { value: true, message: "Password is required." },
                        minLength: { value: 8, message: "Password Too Short." },
                        maxLength: { value: 30, message: "Password Too Long." },
                        pattern: {
                            value: passwordRegex,
                            message: "Invalid Input. Must contain 1 lower case, 1 upper case, between 8-30 characters, and no speical signs."
                        },
                        onChange: handlePasswordChange
                    })} />
                    <label>Password</label>
                    <span> {formState.errors.password?.message}</span>

                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" onChange={handleConfirmPasswordChange} />
                    <label>Confirm Password</label>
                    {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}
                </div>

                <button className="btn btn-primary">Submit</button>
            </form>

        </div>
    );
}

export default Register;
