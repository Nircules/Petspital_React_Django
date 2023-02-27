import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import SubCategoryModel from "../../../Models/SubCategoryModel";
import productsService from "../../../Services/ProductsService";
import "./AddProduct.css";

function AddProduct(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<ProductModel>();
    const [subCategories, setSubCategories] = useState<SubCategoryModel[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/sub_categories')
            .then(response => response.json())
            .then(subCats => setSubCategories(subCats))
            .catch(err => alert(err.message))
    }, [])

    async function send(product: ProductModel) {
        try {
            const addedProduct = await productsService.addProduct(product);
            navigate("/products");
            console.log(addedProduct);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="AddProduct Box">
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit(send)}>
                {/* Product Name */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" {...register("name", {
                        required: { value: true, message: "Missing Name" },
                        minLength: { value: 3, message: "Name too short" },
                        maxLength: { value: 25, message: "Name too long" }
                    })} />
                    <span> {formState.errors.name?.message}</span>
                    <label>Name</label>
                </div>

                {/* Product Description */}
                <div className="form-floating mb-3">
                    <textarea className="form-control"  {...register("description", {
                        required: { value: true, message: "Missing Description" },
                        minLength: { value: 3, message: "Description too short" }
                    })} />
                    <span>{formState.errors.description?.message}</span>
                    <label>Description</label>
                </div>

                {/* Product Description */}
                <div className="form-floating mb-3">
                    <input type="textarea" className="form-control" id="exampleFormControlTextarea1" {...register("description", {
                        required: { value: true, message: "Missing Description" },
                        minLength: { value: 3, message: "Description too short" }
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
                            max: { value: 100, message: "price cant be over 100" }
                        })} />
                        <span>{formState.errors.price?.message}</span>
                        <label>Price</label>
                    </div>

                    {/* Product Stock */}
                    <div className="col form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInput" {...register("stock", {
                            required: { value: true, message: "Missing stock" },
                            min: { value: 1, message: "stock cant be below 1" },
                            max: { value: 100, message: "stock cant be over 100" }
                        })} />
                        <span>{formState.errors.stock?.message}</span>
                        <label>Stock</label>
                    </div>
                </div>
                {/* Product Image */}
                <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile01" accept="image/*" {...register("image")} />
                </div>
                {/* Product Sub Category */}
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="exampleFormControlTextarea1" {...register("sub_category", {
                        required: { value: true, message: "Missing Sub Category" }
                    })} />
                    <span>{formState.errors.sub_category?.message}</span>
                    <label>Sub Category</label>
                </div>
                <button className="btn btn-primary" type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddProduct;
