import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { UserContext } from "../../../Redux/UserContext";
import authFunctions from "../../AuthArea/AuthMenu/AuthFunctions";
import Loading from "../../SharedArea/Loading/Loading";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MenuComponent from "../Menu/MenuComponent";
import Routing from "../Routing/Routing";
import "./Layout.css";

interface TokenPayload {
    user_id: number;
}

function Layout(): JSX.Element {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState<UserModel>();
    const context = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem("tokens");
        if (token) {
            const accessToken = JSON.parse(localStorage.getItem("tokens")).access;
            const container = jwtDecode<TokenPayload>(accessToken);
            authFunctions.getUserById(container.user_id).then((userResponse) => {
                setUser(userResponse);
                setIsLoaded(true);
            });
        } else {
            setIsLoaded(true);
        }
    }, []);

    return (
        < div className="Layout" >
            {!isLoaded ? <Loading /> :
                <UserContext.Provider value={{ user }}>
                    <header><Header></Header></header>
                    <aside><MenuComponent></MenuComponent></aside>
                    <main><Routing></Routing></main>
                    <footer><Footer></Footer></footer>
                </UserContext.Provider>
            }
        </div >
    );
}

export default Layout;
