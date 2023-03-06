import UserModel from "../Models/UserModel";
import {createStore} from "redux";
import jwtDecode from "jwt-decode";
import authService from "../Services/AuthService";

interface TokenPayload {
    user_id: number;
}


export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = localStorage.getItem("tokens")
        if (this.token) {
            const accessToken = JSON.parse(this.token).access
            const container = jwtDecode<TokenPayload>(accessToken)
        }
    }
    
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
}

export interface AuthAction {
    type: AuthActionType,
    payload?: any;
}

export function authReducer(currentState = new AuthState(), action: AuthAction) {
    const newState = {...currentState};
    switch (action.type) {
      case AuthActionType.Register:
      case AuthActionType.Login:
        newState.token = action.payload.access;
        localStorage.setItem("tokens", JSON.stringify(action.payload));
        const container = jwtDecode<TokenPayload>(newState.token);
        authService.getUserById(container.user_id)
          .then(response => {newState.user = response;})
          .catch(err => alert(err.message))
        break;
      case AuthActionType.Logout:
        newState.token = null;
        newState.user = null;
        localStorage.removeItem("tokens");
        break;
    }
    return newState
  }

export const authStore = createStore(authReducer)