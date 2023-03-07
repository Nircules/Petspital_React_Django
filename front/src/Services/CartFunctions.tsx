import axios from "axios";
import jwtDecode from "jwt-decode";
import CartModel from "../Models/CartModel";
import ProductModel from "../Models/ProductModel";

class CartFunctions {
    public async changeCart(cart: CartModel, product: ProductModel, amount = 1): Promise<CartModel> {
        const existsInCart = Boolean(false)
        if (cart) {
            for (let i = 0; i < cart.productsWithAmount.length; i++) {
                if (cart.productsWithAmount[i].product.id === product.id) {
                    cart.productsWithAmount[i].amount += amount;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    return cart
                }
            }
            if (!existsInCart) {
                cart.productsWithAmount.push({ product: product, amount: 1 })
            }
        }
        else {
            const newCart = new CartModel()
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart
    }

    public async removeFromCart(cart: CartModel, product: ProductModel): Promise<CartModel> {
        for (let i = 0; i < cart.productsWithAmount.length; i++) {
            if (cart.productsWithAmount[i].product.id === product.id) {
                cart.productsWithAmount.splice(i, 1)
                localStorage.setItem("cart", JSON.stringify(cart));
                return cart
            }
        }
    }

    public async clearCart(cart: CartModel, product: ProductModel): Promise<CartModel> {
        for (let i = 0; i < cart.productsWithAmount.length; i++) {
            if (cart.productsWithAmount[i].product.id === product.id) {
                cart.productsWithAmount.splice(i, 1)
                localStorage.setItem("cart", JSON.stringify(cart));
                return cart
            }
        }
    }

}

const cartFunctions = new CartFunctions()
export default cartFunctions