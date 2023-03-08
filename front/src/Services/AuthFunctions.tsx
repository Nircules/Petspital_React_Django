import axios from "axios";
import UserModel from "../Models/UserModel";
import UserProfileModel from "../Models/UserProfileModel";
import config from "../Utils/Config";

class AuthFunctions {
    public async getUserById(user_id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(config.usersUrl + user_id)
        return response.data;
    }

    public async getUserProfileById(user_id: number): Promise<UserProfileModel> {
        const response = await axios.get<UserProfileModel>(config.usersProfilesUrl + user_id)
        return response.data;
    }

    public async getAllProfiles(): Promise<UserProfileModel[]> {
        const response = await axios.get<UserProfileModel[]>(config.usersProfilesUrl)
        return response.data;
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const response = await axios.get<UserModel[]>(config.usersUrl)
        return response.data;
    }

    public async login(credentials: UserModel): Promise<void> {
        let response = await fetch(config.loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': credentials.username, 'password': credentials.password })
        })
        const token = await response.json();
        if (response.status === 200) {
            localStorage.setItem("tokens", JSON.stringify(token));
        } else if (response.status === 401) {
            throw new Error('No Such User.')
        } else {
            alert('Something went wrong!')
        }
    }

    public async register(new_user: UserModel): Promise<UserModel> {
        const formData = new FormData();
        formData.append("username", new_user.username);
        formData.append("password", new_user.password);
        const response = await axios.post<UserModel>(config.usersUrl, formData);
        return response.data
    }

    public async updateUser(profile: UserProfileModel, user_id: number): Promise<UserProfileModel> {
        const formData = new FormData();
        formData.append("first_name", profile.first_name)
        formData.append("last_name", profile.last_name)
        formData.append("email", profile.email)
        formData.append("phone_number", profile.phone_number)
        formData.append("id_number", profile.id_number)
        formData.append("address", profile.address)
        const response = await axios.put<UserProfileModel>(config.usersProfilesUrl + user_id, formData)
        return response.data;
    }


}

const authFunctions = new AuthFunctions()
export default authFunctions