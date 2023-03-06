import UserModel from "../Models/UserModel";
import axios from "axios";
import config from "../Utils/Config";
import {AuthActionType, authStore} from "../Redux/AuthStore";

class AuthService {
    public async getUserById(user_id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(config.usersUrl + user_id);
        const user = response.data
        return user;
    }

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        authStore.dispatch({type: AuthActionType.Register, payload: token})
    }

    public async login(credentials: UserModel): Promise<void> {
        let response = await fetch(config.loginUrl, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':credentials.username, 'password':credentials.password})
        })
        const token = await response.json();
        if(response.status === 200){
            authStore.dispatch({type: AuthActionType.Login, payload: {'access': token.access, 'refresh': token.refresh}})
        }else if(response.status === 401){
            throw new Error('No Such User.')
        } else {
            alert('Something went wrong!')
        }
    }

    public logout(): void {
        authStore.dispatch({type: AuthActionType.Logout});
    }
}

const authService = new AuthService();
export default authService;