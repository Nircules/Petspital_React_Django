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
        const prodToEditId = +params.prodToEdit;
        productsService.getOneProductById(prodToEditId)
            .then(prodToEdit => {
                setProduct(prodToEdit);
                setValue("id", prodToEdit.id);
                setValue("name", prodToEdit.name);
                setValue("description", prodToEdit.description);
                setValue("price", prodToEdit.price);
                setValue("stock", prodToEdit.stock);
                setValue("sub_category", prodToEdit.sub_category);
            })
            .catch(err => alert(err.message))
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
                {/* Product Name */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" {...register("name", {
                        required: { value: true, message: "Missing name" },
                        min: { value: 3, message: "Name too short" },
                        max: { value: 25, message: "Name too long" }
                    })} />
                    <span>{formState.errors.name?.message}</span>
                    <label>Name</label>
                </div>

                {/* Product Description */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="exampleFormControlTextarea1" {...register("description", {
                        required: { value: true, message: "Missing Description" },
                        min: { value: 3, message: "Description too short" }
                    })} />
                    <span>{formState.errors.description?.message}</span>
                    <label>Description</label>
                </div>

                <div className="row">
                    {/* Product Price */}
                    <div className="form-floating mb-3 col">
                        <input type="number" className="form-control" id="floatingInput" {...register("price", {
                            required: { value: true, message: "Missing price" },
                            min: { value: 1, message: "price cant be below 1" },
                            max: { value: 5000, message: "price cant be over 5000" }
                        })} />
                        <span>{formState.errors.price?.message}</span>
                        <label>Price</label>
                    </div>
                    {/* Product Stock */}
                    <div className="form-floating mb-3 col">
                        <input type="number" className="form-control" id="floatingInput" {...register("stock", {
                            required: { value: true, message: "Missing stock" },
                            min: { value: 1, message: "stock cant be below 1" },
                            max: { value: 100, message: "stock cant be over 100" }
                        })} />
                        <span>{formState.errors.stock?.message}</span>
                        <label>stock</label>
                    </div>
                </div>

                {/* Product Image */}
                <img src={config.productImagesUrl + product?.image} />
                <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile01" accept="image/*"  {...register("image")} />
                </div>

                {/* Product Sub Category */}
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="exampleFormControlTextarea1" {...register("sub_category", {
                        required: { value: true, message: "Missing Sub Category" }
                    })} />
                    <span>{formState.errors.sub_category?.message}</span>
                    <label>Sub Category</label>
                </div>
                <button className="btn btn-primary">Edit</button>
            </form>
        </div>
    );
}

export default EditProduct;
