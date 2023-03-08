import "./EditProfile.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Redux/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserProfileModel from "../../../Models/UserProfileModel";
import authFunctions from "../../../Services/AuthFunctions";
import Loading from "../../SharedArea/Loading/Loading";

function EditProfile(): JSX.Element {
    const context = useContext(UserContext)
    const { register, handleSubmit, formState, setValue, setError } = useForm<UserProfileModel>();
    const [profile, setProfile] = useState<UserProfileModel>()
    const navigate = useNavigate()
    const [allProfiles, setAllProfiles] = useState<UserProfileModel[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const phoneRegex = /^\d{10}$/;
    const idNumberRegex = /^\d{9}$/;

    useEffect(() => {
        authFunctions.getUserProfileById(context.user.id)
            .then(response => {
                if (response.first_name != '') {
                    setProfile(response)
                    setValue("first_name", response.first_name)
                    setValue("last_name", response.last_name)
                    setValue("email", response.email)
                    setValue("phone_number", response.phone_number.replace('+972', '0'))
                    setValue("id_number", response.id_number)
                    setValue("address", response.address)
                }
            })
            .catch(err => alert(err.message))
            .finally(() => setIsLoading(false))
        authFunctions.getAllProfiles()
            .then(response => setAllProfiles(response))
            .catch(err => alert(err.message))
    }, [])

    function send(formProfile: UserProfileModel) {
        for (const prof of allProfiles) {
            if (prof.email === formProfile.email && profile.email != prof.email) {
                setError("email", { type: "emailTaken", message: "Email Already Taken" })
                return
            } else if (prof.phone_number === formProfile.phone_number.replace('0', '+972') && profile.phone_number != prof.phone_number) {
                setError("phone_number", { type: "phoneTaken", message: "Phone Number Already Taken" })
                return
            } else if (prof.id_number === formProfile.id_number && profile.id_number != prof.id_number) {
                setError("id_number", { type: "idNumberTaken", message: "ID Number Already Taken" })
                return
            }
        }
        authFunctions.updateUser(formProfile, context.user.id)
            .then(() => {
                navigate(`/user_profile/${context.user.id}`)
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className="EditProfile Box">
            <h1>Edit Profile</h1>

            <form onSubmit={handleSubmit(send)}>
                {/* First Name */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" {...register("first_name", {
                        required: { value: true, message: "Missing First Name" },
                        minLength: { value: 2, message: "Name too short" },
                        maxLength: { value: 22, message: "Name too long" }
                    })} />
                    <span>{formState.errors.first_name?.message}</span>
                    <label>First Name</label>
                </div>

                {/* Last Name */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" {...register("last_name", {
                        required: { value: true, message: "Missing Last Name" },
                        minLength: { value: 3, message: "Name too short" },
                        maxLength: { value: 22, message: "Name too long" }
                    })} />
                    <span>{formState.errors.last_name?.message}</span>
                    <label>Last Name</label>
                </div>

                {/* Email */}
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" {...register("email", {
                        required: { value: true, message: "Missing Email" },
                    })} />
                    <span>{formState.errors.email?.message}</span>
                    <label>Email</label>
                </div>

                {/* Phone Number */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" {...register("phone_number", {
                        required: { value: true, message: "Missing Phone Number" },
                        pattern: { value: phoneRegex, message: "Must be 10 digits." }
                    })} />
                    <span>{formState.errors.phone_number?.message}</span>
                    <label>Phone Number</label>
                </div>

                {/* ID Number */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" {...register("id_number", {
                        required: { value: true, message: "Missing ID Number" },
                        pattern: { value: idNumberRegex, message: "Must be 9 digits." }
                    })} />
                    <span>{formState.errors.id_number?.message}</span>
                    <label>ID Number</label>
                </div>

                {/* Address */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" {...register("address", {
                        required: { value: true, message: "Missing Address" },
                    })} />
                    <span>{formState.errors.address?.message}</span>
                    <label>Address</label>
                </div>

                <button type="submit" className="button-29">Edit</button>
            </form>
        </div>
    );
}

export default EditProfile;
