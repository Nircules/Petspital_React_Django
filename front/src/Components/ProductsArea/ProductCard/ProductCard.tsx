import { NavLink } from "react-router-dom";
import { useContext, } from "react";
import ProductModel from "../../../Models/ProductModel";
import { CartContext } from "../../../Redux/CartContext";
import config from "../../../Utils/Config";
import "./ProductCard.css";
import cartFunctions from "../../../Services/CartFunctions";
import CartModel from "../../../Models/CartModel";

interface ProductCardProps {
    product: ProductModel;
}

function ProductCard(props: ProductCardProps): JSX.Element {
    // const { cart, setCart } = useContext(CartContext);
    const { cart, setCart } = useContext(CartContext)
    async function addProduct(product: ProductModel) {
        await cartFunctions.changeCart(cart, product);
        setCart(new CartModel());
    }

    return (
        <div className="ProductCard">
            <div className="col">
                <div className="card">
                    <NavLink to={`/products/details/` + props.product.id}>
                        <img src={config.productImagesUrl + props.product.image} className="card-img-top" alt="..." />
                    </NavLink>
                    <h5 className="card-header">{props.product.name}</h5>
                    <div className="card-body">
                        <p className="card-text">{props.product.description}</p>
                    </div>
                    <div className="card-footer">
                        <p>₪{props.product.price}</p>
                        <button className="button-29" onClick={() => addProduct(props.product)}>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
