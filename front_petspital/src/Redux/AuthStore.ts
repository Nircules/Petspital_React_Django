import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

// 1. Global state 
export class AuthState {
    public token: string = null;
    public user: UserModel = null;


    public constructor() {
        this.token = localStorage.getItem("token");
        if (this.token) {
            const container: { user: UserModel } = jwtDecode(this.token);
            this.user = container.user;
        }
    }

}


// 2. Auth Action Type 
export enum AuthActionType {
    Register = "Register",
    Login = "Login ",
    Logout = "Logout"
}


// 3. Auth Action
export interface AuthAction {
    type: AuthActionType,
    payload?: string; //something else...
}


// 4. Auth Reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };


    switch (action.type) {

        case AuthActionType.Register: //Here the payload is the token (string)
        case AuthActionType.Login: //Here the payload is the token (string)
            newState.token = action.payload;
            localStorage.setItem("token", action.payload);
            const container: { user: UserModel } = jwtDecode(newState.token)
            newState.user = container.user;
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }

    return newState;
}

//5. Create Store
export const authStore = createStore(authReducer);