import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthStore";
import config from "../Utils/Config";

class AuthService {

    public async register(user: UserModel): Promise<void> {

        const response = await axios.post<string>(config.registerUrl, user);

        const token = response.data;
        console.log(token);
        authStore.dispatch({ type: AuthActionType.Register, payload: token })
    }


    public async login(credentials: CredentialsModel): Promise<void> {

        const response = await axios.post<string>(config.loginUrl, credentials);

        const token = response.data;

        authStore.dispatch({ type: AuthActionType.Login, payload: token })
    }

    public logout(): void {

        authStore.dispatch({ type: AuthActionType.Logout });


    }

}
const authService = new AuthService();
export default authService;