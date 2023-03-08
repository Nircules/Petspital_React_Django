import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import SubCategoryModel from "../../../Models/SubCategoryModel";
import productsService from "../../../Services/ProductsService";
import "./AddProduct.css";

interface CategoryInterface {
    id: number;
    name: string;
    specieId: number;
    subcategories: SubCategoryModel[];
}
function AddProduct(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<ProductModel>();
    const [categories, setCategories] = useState<CategoryInterface[]>([]);

    const options = categories.flatMap((category) => (
        category.subcategories.map((subcategory) => (
            <option key={`${category.name}-${subcategory.name}`} value={subcategory.id}>
                {`${category.name}, ${subcategory.name}`}
            </option>
        ))
    ));

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch categories
                const categoriesResponse = await fetch("http://127.0.0.1:8000/categories");
                const categories = await categoriesResponse.json() as CategoryInterface[];

                // Fetch subcategories for each category
                const categoriesWithSubcategories = await Promise.all(
                    categories.map(async (category) => {
                        const subcategoriesResponse = await fetch(
                            "http://127.0.0.1:8000/sub_categories_by_category/" + category.id
                        );
                        const subcategories = await subcategoriesResponse.json() as SubCategoryModel[];

                        return {
                            ...category,
                            subcategories,
                        };
                    })
                );
                setCategories(categoriesWithSubcategories);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    async function send(product: ProductModel) {
        try {
            await productsService.addProduct(product);
            navigate("/products");
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
                        maxLength: { value: 22, message: "Name too long" }
                    })} />
                    <span> {formState.errors.name?.message}</span>
                    <label>Name</label>
                </div>

                {/* Product Description */}
                <div className="form-floating mb-3">
                    <textarea className="form-control" rows={6} {...register("description", {
                        required: { value: true, message: "Missing Description" },
                        minLength: { value: 3, message: "Description too short" }
                    })} />
                    <span>{formState.errors.description?.message}</span>
                    <label>Description</label>
                </div>

                {/* Product Price + Stock*/}
                <div className="row">
                    <div className="form-floating mb-3 col">
                        <input type="number" className="form-control" id="floatingInput" {...register("price", {
                            required: { value: true, message: "Missing price" },
                            min: { value: 1, message: "price cant be below 1" },
                            max: { value: 20000, message: "price cant be over 20000" }
                        })} />
                        <span>{formState.errors.price?.message}</span>
                        <label>Price</label>
                    </div>
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
                    <input type="text" className="form-control" list="subCats" {...register("sub_category", {
                        required: { value: true, message: "Missing Sub Category" }
                    })} />
                    <datalist id="subCats">
                        {options}
                    </datalist>
                    <label>Sub Category</label>
                </div>
                <button className="btn btn-primary" type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddProduct;
