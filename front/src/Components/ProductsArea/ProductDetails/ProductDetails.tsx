import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import CartModel from "../../../Models/CartModel";
import ProductModel from "../../../Models/ProductModel";
import UserModel from "../../../Models/UserModel";
import { CartContext } from "../../../Redux/CartContext";
import { UserContext } from "../../../Redux/UserContext";
import cartFunctions from "../../../Services/CartFunctions";
import productsService from "../../../Services/ProductsService";
import config from "../../../Utils/Config";
import Loading from "../../SharedArea/Loading/Loading";
import "./ProductDetails.css";

function ProductDetails(): JSX.Element {
    const { pathname } = useLocation();
    const [product, setProduct] = useState<ProductModel>();
    const params = useParams();
    const navigate = useNavigate();
    const context = useContext(UserContext)
    const [user, setUser] = useState<UserModel | undefined>(context.user)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { cart, setCart } = useContext(CartContext)

    async function addProduct(product: ProductModel, amount = 1) {
        await cartFunctions.changeCart(cart, product, amount);
        setCart(new CartModel());
    }

    useEffect(() => {
        setUser(context.user)
        const prodId = +params.prodId;
        productsService.getOneProductById(prodId)
            .then(p => setProduct(p))
            .catch(() => navigate("/products"))
            .finally(() => setIsLoading(false))
    }, [pathname])

    function deleteProduct() {
        productsService.deleteProduct(product.id)
            .then(() => {
                alert(product.name + " has been deleted");
                navigate("/products");
            })
            .catch(err => alert(err.message))
    }

    if (isLoading) {
        return <Loading />
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
                        <button className="button-29" onClick={() => addProduct(product)}>ADD TO CART</button>
                    </div>
                    {user && user.is_staff && <div className="card-footer">
                        <NavLink className="button-29" to={"/products/edit/" + product.id}>Edit</NavLink>
                        <span> | </span>
                        <button className="button-29 logout" onClick={deleteProduct}>Delete</button>
                    </div>}
                </div>
            </div>}
        </div>
    );
}

export default ProductDetails;
