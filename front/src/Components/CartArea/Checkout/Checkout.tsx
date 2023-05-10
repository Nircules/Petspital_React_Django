import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartModel from "../../../Models/CartModel";
import ProductModel from "../../../Models/ProductModel";
import UserModel from "../../../Models/UserModel";
import UserProfileModel from "../../../Models/UserProfileModel";
import { CartContext } from "../../../Redux/CartContext";
import { UserContext } from "../../../Redux/UserContext";
import authFunctions from "../../../Services/AuthFunctions";
import cartFunctions from "../../../Services/CartFunctions";
import CartProductCard from "../CartProductCard/CartProductCard";
import "./Checkout.css";

function Checkout(): JSX.Element {
    const { cart, setCart } = useContext(CartContext)
    const context = useContext(UserContext);
    const [user, setUser] = useState<UserModel | undefined>(context.user)
    const [profile, setProfile] = useState<UserProfileModel>()

    const navigate = useNavigate()
    let total_price = 0;
    let total_amount = 0;

    useEffect(() => {
        setUser(context.user);
        if (context.user) {
            authFunctions.getUserProfileById(context.user.id)
                .then(response => {
                    if (response.first_name === '') {
                        navigate(`/edit_profile/${context.user.id}`)
                    }
                    else {
                        setProfile(response)
                    }
                })
        }

    }, [])

    async function order(cart: CartModel) {
        alert("Sorry our website is under maintenance, can't take orders now.")
    }


    return (
        <div className="Checkout">
            <div id="cart-content">
                <h1>Checkout Page</h1>
                <hr />
                {profile && <div id="cart-header">
                    Hello {profile.first_name} {profile.last_name} <br />
                    Phone Number: {profile.phone_number.replace('+972', '0')}
                </div>
                }
                <hr />
                {cart.productsWithAmount.length > 0 ?
                    <div id="cart-products">
                        {cart.productsWithAmount.map(p => {
                            total_price += p.product.price * p.amount;
                            total_amount += p.amount;
                            return <div className="column" key={p.product.id}><CartProductCard productsWithAmount={p} /></div>
                        })}
                    </div>
                    : <div id="no-cart">No products.</div>

                }


                {user ? <div id="bottom-checkout">
                    <span className="total-price total">Total: ₪{total_price} <br /></span>
                    <button className="button-29" onClick={() => order(cart)}>Order Now</button>
                </div> :
                    <div className="btn btn-warning" onClick={() => navigate("/login")}>Must be logged in to checkout.</div>}
            </div>
        </div>
    );
}

export default Checkout;
