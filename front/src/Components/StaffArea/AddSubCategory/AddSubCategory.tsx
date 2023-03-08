import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import SubCategoryModel from "../../../Models/SubCategoryModel";
import { UserContext } from "../../../Redux/UserContext";
import Loading from "../../SharedArea/Loading/Loading";
import "./AddSubCategory.css";



function AddSubCategory(): JSX.Element {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<SubCategoryModel>();
    const [categories, setCategories] = useState<CategoryModel[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function send(sub_category: SubCategoryModel) {
        try {
            await axios.post("http://127.0.0.1:8000/sub_categories", sub_category)
                .then(() => {
                    alert("Added Sub Category");
                    navigate("/home")
                })
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        } else if (!user.is_staff) {
            navigate("/home")
        }
        fetch("http://127.0.0.1:8000/categories")
            .then(response => response.json())
            .then((cats: CategoryModel[]) => {
                setCategories(cats);
            })
            .catch(err => alert(err.message))
            .finally(() => setIsLoading(false))

    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="AddSubCategory Box">
            <h2>Add Sub Category</h2>
            {user && user.is_staff &&

                <form onSubmit={handleSubmit(send)}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" {...register("name", {
                            required: { value: true, message: "Missing Name" },
                            minLength: { value: 3, message: "Name too short" },
                            maxLength: { value: 22, message: "Name too long" }
                        })} />
                        <span> {formState.errors.name?.message}</span>
                        <label>Sub Category Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" list="subCats" {...register("category", {
                            required: { value: true, message: "Missing Sub Category" }
                        })} />
                        <datalist id="subCats">
                            {categories.map(category => (
                                <option key={category.id} value={category.id} >
                                    {category.name}
                                </option>
                            ))}
                        </datalist>
                        <label>Category</label>

                    </div>
                    <button className="button-29">Add</button>
                </form>
            }
        </div>
    );
}

export default AddSubCategory;
