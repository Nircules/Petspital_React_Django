import axios from "axios";
import CategoryModel from "../../../Models/CategoryModel";
import SpecieModel from "../../../Models/SpecieModel";

class MenuFunctions {
    public async fetchSpecies() {
        const response = await axios.get<SpecieModel[]>('http://127.0.0.1:8000/species');
        return response.data
    }

    public async fetchCategories(specieId: number) {
        const response = await axios.get<CategoryModel[]>('http://127.0.0.1:8000/categories/' + specieId);
        console.log(response.data)
        return response.data
    }
}

const menuService = new MenuFunctions()
export default menuService