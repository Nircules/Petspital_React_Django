import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import config from "../../../Utils/Config";
import "./ProductCard.css";

interface ProductCardProps {
    product: ProductModel;
}


function ProductCard(props: ProductCardProps): JSX.Element {

    return (
        <div className="ProductCard">
            <div className="col">
                <div className="card">
                    <NavLink to={`/products/details/` + props.product.id}>
                        <img src={config.productImagesUrl + props.product.imageName} className="card-img-top" alt="..." />
                    </NavLink>
                    <div className="card-body">
                        <h5 className="card-title">{props.product.name}</h5>
                        <p className="card-text">{props.product.price}₪</p>
                        <p className="card-text">stock: {props.product.stock}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
