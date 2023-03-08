import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import SpecieModel from "../../../Models/SpecieModel";
import { UserContext } from "../../../Redux/UserContext";
import Loading from "../../SharedArea/Loading/Loading";
import "./AddCategory.css";

function AddCategory(): JSX.Element {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<CategoryModel>();
    const [species, setSpecies] = useState<SpecieModel[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function send(category: CategoryModel) {
        try {
            await axios.post("http://127.0.0.1:8000/categories", category)
                .then(() => {
                    alert("Added Category");
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
        fetch("http://127.0.0.1:8000/species")
            .then(response => response.json())
            .then((speciesResponse: CategoryModel[]) => {
                setSpecies(speciesResponse);
            })
            .catch(err => alert(err.message))
            .finally(() => setIsLoading(false))

    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="AddCategory Box">
            <h2>Add Category</h2>
            {user && user.is_staff &&

                <form onSubmit={handleSubmit(send)}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" {...register("name", {
                            required: { value: true, message: "Missing Name" },
                            minLength: { value: 3, message: "Name too short" },
                            maxLength: { value: 22, message: "Name too long" }
                        })} />
                        <span> {formState.errors.name?.message}</span>
                        <label>Category Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" list="subCats" {...register("specie", {
                            required: { value: true, message: "Missing Sub Category" }
                        })} />
                        <datalist id="subCats">
                            {species.map(specie => (
                                <option key={specie.id} value={specie.id} >
                                    {specie.name}
                                </option>
                            ))}
                        </datalist>
                        <label>Specie</label>

                    </div>
                    <button className="button-29">Add</button>
                </form>
            }
        </div>
    );
}

export default AddCategory;
