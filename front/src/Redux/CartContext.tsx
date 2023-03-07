import { createContext, useEffect, useState } from "react";
import CartModel from "../Models/CartModel";
import ProductModel from "../Models/ProductModel";


type CartContextType = {
    cart: CartModel;
    setCart: (newCart: CartModel) => void;
}
export const CartContext = createContext<CartContextType>({
    cart: new CartModel(),
    setCart: () => { },
});

type CartProviderProps = {
    children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartModel>(new CartModel());

    useEffect(() => {
        const newCart = new CartModel();
        setCart(newCart);
    }, [])
    const value: CartContextType = { cart, setCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
