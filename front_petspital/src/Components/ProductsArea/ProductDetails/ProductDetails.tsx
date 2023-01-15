import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
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
        <div className="ProductDetails Box">
            {product && <div>
                <div className="card">
                    <img src={config.productImagesUrl + product.imageName} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-text">{product.name}</h5>
                        <p className="card-text">{product.price}₪</p>
                        <p className="card-text">stock:{product.stock}</p>
                    </div>
                    <NavLink className="btn btn-primary" to={"/products/edit/" + product.id}>Edit</NavLink>
                    <button className="btn btn-danger" onClick={deleteProduct}>Delete</button>
                </div>
            </div>}
        </div>
    );
}

export default ProductDetails;
