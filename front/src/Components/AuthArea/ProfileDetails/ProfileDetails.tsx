import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Redux/UserContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./ProfileDetails.css";
import UserProfileModel from "../../../Models/UserProfileModel";
import authFunctions from "../../../Services/AuthFunctions";
import Loading from "../../SharedArea/Loading/Loading";

function ProfileDetails(): JSX.Element {
    const context = useContext(UserContext)
    const [profile, setProfile] = useState<UserProfileModel>()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();


    useEffect(() => {
        authFunctions.getUserProfileById(context.user.id)
            .then(response => {
                if (response.first_name === '') {
                    navigate(`/edit_profile/${context.user.id}`)
                }
                else {
                    setProfile(response)
                }
            })
            .catch(err => alert(err.message))
            .finally(() => setIsLoading(false));
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="ProfileDetails Box">
            <div className="card col">
                <div className="card-header">{profile.first_name} {profile.last_name}</div>
                <div className="card-body">
                    <table id="profile">
                        <tbody>
                            <tr>
                                <td>Email:</td>
                                <td>{profile.email}</td>
                            </tr>
                            <tr>
                                <td>Phone Number:</td>
                                <td>{profile.phone_number.replace('+972', '0')}</td>
                            </tr>
                            <tr>
                                <td>ID Number:</td>
                                <td>{profile.id_number}</td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>{profile.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    <Link to={"/edit_profile/" + context.user.id} style={{ textDecoration: 'none' }}>
                        <button className="button-29">Edit</button>
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default ProfileDetails;
