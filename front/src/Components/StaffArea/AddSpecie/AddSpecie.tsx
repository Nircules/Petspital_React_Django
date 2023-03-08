import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Redux/UserContext";
import SpecieModel from "../../../Models/SpecieModel";

import "./AddSpecie.css";
import axios from "axios";

function AddSpecie(): JSX.Element {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<SpecieModel>();

    async function send(specie: SpecieModel) {
        try {
            await axios.post("http://127.0.0.1:8000/species", specie)
                .then(() => {
                    alert("Added Specie");
                    navigate("/home")
                })
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        } else if (!user.is_staff) {
            navigate("/home")
        }

    }, [])


    return (
        <div className="AddSpecie Box">
            <h2>Add Specie</h2>
            {user && user.is_staff &&
                <form onSubmit={handleSubmit(send)}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" {...register("name", {
                            required: { value: true, message: "Missing Name" },
                            minLength: { value: 3, message: "Name too short" },
                            maxLength: { value: 15, message: "Name too long" }
                        })} />
                        <span> {formState.errors.name?.message}</span>
                        <label>Specie Name</label>
                    </div>
                    <button className="button-29">Add</button>
                </form>
            }
        </div>
    );
}

export default AddSpecie;
