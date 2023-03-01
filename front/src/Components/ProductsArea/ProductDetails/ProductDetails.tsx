import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import config from "../../../Utils/Config";
import "./ProductDetails.css";

function ProductDetails(): JSX.Element {
    const [product, setProduct] = useState<ProductModel>();
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const prodId = +params.prodId;
        productsService.getOneProductById(prodId)
            .then(p => setProduct(p))
            .catch(() => navigate("/products"))

    }, [])

    function deleteProduct() {
        productsService.deleteProduct(product.id)
            .then(() => {
                alert(product.name + " has been deleted");
                navigate("/products");
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className="ProductDetails">
            {product && <div className="row">
                <img src={config.productImagesUrl + product.image} className="col border-beauty" alt="..." />
                <div className="card col">
                    <div className="card-header">{product.name}</div>
                    <div className="card-body">
                        <p className="card-text">{product.description}</p>
                        <p className="card-text">Stock: {product.stock}</p>
                    </div>
                    <div className="card-footer">
                        <p>{product.price}₪</p>
                        <button className="button-29">ADD TO CART</button>
                    </div>
                    <div className="card-footer">
                        <NavLink className="btn btn-primary" to={"/products/edit/" + product.id}>Edit</NavLink>
                        <button className="btn btn-danger" onClick={deleteProduct}>Delete</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default ProductDetails;
