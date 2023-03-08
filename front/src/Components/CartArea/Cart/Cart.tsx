import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CartModel from "../../../Models/CartModel";
import { CartContext } from "../../../Redux/CartContext";
import cartFunctions from "../../../Services/CartFunctions";
import CartProductCard from "../CartProductCard/CartProductCard";
import "./Cart.css";

function Cart(): JSX.Element {
    function w3_open(): void {
        document.getElementById("mySidebar")!.style.display = "block";
        document.getElementById("myOverlay")!.style.display = "block";
    }

    function w3_close(): void {
        document.getElementById("mySidebar")!.style.display = "none";
        document.getElementById("myOverlay")!.style.display = "none";
    }

    let total_price = 0;
    let total_amount = 0;
    const { cart, setCart } = useContext(CartContext)

    useEffect(() => {

    }, [cart])


    async function clearProducts() {
        await cartFunctions.clearCart();
        setCart(new CartModel());
    }

    return (
        <div className="Cart">
            {/* <!-- Sidebar --> */}
            <div className="w3-sidebar w3-bar-block w3-animate-left" style={{ display: "none" }} id="mySidebar">

                <div id="close-cart">
                    <button className="w3-button w3-white w3-xxlarge" onClick={w3_close}> &times;</button>
                </div>
                <h1 id="cart-title">Your Cart:</h1>
                <hr />
                {cart.productsWithAmount.length > 0 ?
                    <div id="cart-content">
                        <ul>
                            {cart.productsWithAmount.map(p => {
                                total_price += p.product.price * p.amount;
                                total_amount += p.amount;
                                return <CartProductCard key={p.product.id} productsWithAmount={p} />
                            })}
                        </ul>
                        <div className="total-price total">Total: {total_price}₪</div>
                    </div>

                    : <div id="no-cart">No products.</div>

                }

                <NavLink to="/checkout"><button className="button-29" id="checkout-button" onClick={w3_close}>Proceed To Checkout</button></NavLink>
                <button className="btn btn-danger" id="checkout-button-clear" onClick={clearProducts}>Clear Cart</button>
            </div>


            <div className="w3-overlay" onClick={w3_close} style={{ cursor: "pointer" }} id="myOverlay"></div>

            <div>
                <button className="w3-button w3-white w3-xxlarge" onClick={w3_open} id="shopping-cart">
                    Cart <i className="fa">&#xf07a;</i>
                    <span className='badge badge-warning' id='lblCartCount'> {total_amount} </span>
                </button>
            </div>
        </div >
    );
}

export default Cart;
