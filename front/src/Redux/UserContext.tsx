import { createContext } from "react";
import UserModel from "../Models/UserModel";


type UserContextType = {
    user: UserModel,
};

export const UserContext = createContext<UserContextType>({ user: null });


