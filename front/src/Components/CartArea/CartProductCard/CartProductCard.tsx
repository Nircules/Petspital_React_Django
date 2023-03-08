import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CartModel from "../../../Models/CartModel";
import ProductModel from "../../../Models/ProductModel";
import { CartContext } from "../../../Redux/CartContext";
import cartFunctions from "../../../Services/CartFunctions";
import config from "../../../Utils/Config";
import "./CartProductCard.css";

interface CartProductCardProps {
    productsWithAmount: {
        product: ProductModel;
        amount: number;
    };
}

function w3_close(): void {
    document.getElementById("mySidebar")!.style.display = "none";
    document.getElementById("myOverlay")!.style.display = "none";
}

function CartProductCard(props: CartProductCardProps): JSX.Element {
    const { cart, setCart } = useContext(CartContext)

    async function addProduct(product: ProductModel, amount = 1) {
        await cartFunctions.changeCart(cart, product, amount);
        setCart(new CartModel());
    }

    async function removeProduct(product: ProductModel) {
        await cartFunctions.removeFromCart(cart, product);
        setCart(new CartModel());
    }


    return (
        <div className="CartProductCard">
            <li className="clearfix product-cart-card">
                <div className="remove-from-cart btn btn-danger" onClick={() => removeProduct(props.productsWithAmount.product)}>X</div>
                <NavLink to={`/products/details/` + props.productsWithAmount.product.id} onClick={w3_close}>
                    <img src={config.productImagesUrl + props.productsWithAmount.product.image} alt="item1" />
                </NavLink>
                <h2 className="item-name">{props.productsWithAmount.product.name}</h2>
                <span className="item-price">Price for one: ₪{props.productsWithAmount.product.price}</span><br />
                <span className="item-quantity">
                    <button className="btn btn-danger" onClick={() => addProduct(props.productsWithAmount.product, -1)}>-</button>
                    &nbsp;&nbsp;&nbsp;
                    Quantity: {props.productsWithAmount.amount}
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-success" onClick={() => addProduct(props.productsWithAmount.product)}>+</button>
                </span><br />
                <span className="total-price">Total: ₪{props.productsWithAmount.product.price * props.productsWithAmount.amount}</span>
            </li>
            <hr />
        </div>
    );
}

export default CartProductCard;
