import axios from "axios";
import jwtDecode from "jwt-decode";
import UserModel from "../../../Models/UserModel";
import config from "../../../Utils/Config";

interface TokenPayload {
    user_id: number;
}

class AuthFunctions {
    public async getUserById(user_id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(config.usersUrl + user_id)
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
}

const authFunctions = new AuthFunctions()
export default authFunctions