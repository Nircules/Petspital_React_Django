import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import CartModel from "../../../Models/CartModel";
import UserModel from "../../../Models/UserModel";
import { CartContext, CartProvider } from "../../../Redux/CartContext";
import { UserContext } from "../../../Redux/UserContext";
import authFunctions from "../../../Services/AuthFunctions";
import Cart from "../../CartArea/Cart/Cart";
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
    const [isLoadedCart, setIsLoadedCart] = useState(false);
    const [user, setUser] = useState<UserModel>();
    const cart = new CartModel();

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
            {!isLoaded && !isLoadedCart ? <Loading /> :
                <UserContext.Provider value={{ user }}>
                    <CartProvider>
                        <header><Header></Header> </header>
                        <aside><MenuComponent></MenuComponent></aside>
                        <main><Routing></Routing></main>
                        <footer><Footer></Footer></footer>
                        <Cart></Cart>
                    </CartProvider>
                </UserContext.Provider>
            }
        </div >
    );
}

export default Layout;
