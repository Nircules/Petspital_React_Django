import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import config from "../../../Utils/Config";
import "./EditProduct.css";

function EditProduct(): JSX.Element {

    const [product, setProduct] = useState<ProductModel>();
    const navigate = useNavigate();
    const params = useParams();
    const { register, handleSubmit, formState, setValue } = useForm<ProductModel>();

    useEffect(() => {
        const prodToEditId = +params.prodToEdit; //Get Id From Route

        productsService.getOneProductById(prodToEditId) //Get Product to edit from service
            .then(prodToEdit => {
                setProduct(prodToEdit);
                setValue("id", prodToEdit.id); //set form Product
                setValue("name", prodToEdit.name);
                setValue("price", prodToEdit.price);
                setValue("stock", prodToEdit.stock);
            })
            .catch(err => alert(err.message)) // show message if something went wrong
    }, [])


    function send(formProduct: ProductModel) {
        productsService.editProduct(formProduct)
            .then(editedProduct => { alert(product.name + " has been edited!"); navigate("/products/details/" + formProduct.id) })
            .catch(err => alert(err.message))
    }

    return (
        <div className="EditProduct Box">

            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit(send)}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" {...register("name", {
                        required: { value: true, message: "Missing name" },
                        min: { value: 3, message: "Name too short" },
                        max: { value: 25, message: "Name too long" }
                    })} />
                    <span>{formState.errors.name?.message}</span>
                    <label>Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="floatingInput" {...register("price", {
                        required: { value: true, message: "Missing price" },
                        min: { value: 1, message: "price cant be below 1" },
                        max: { value: 200, message: "price cant be over 200" }
                    })} />
                    <span>{formState.errors.price?.message}</span>
                    <label>Price</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="floatingInput" {...register("stock", {
                        required: { value: true, message: "Missing stock" },
                        min: { value: 1, message: "stock cant be below 1" },
                        max: { value: 100, message: "stock cant be over 100" }
                    })} />
                    <span>{formState.errors.stock?.message}</span>
                    <label>stock</label>
                </div>
                <img src={config.productImagesUrl + product?.imageName} />

                <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile01" accept="image/*"  {...register("image")} />
                </div>
                <button className="btn btn-primary">Edit</button>
            </form>
        </div>
    );
}

export default EditProduct;
