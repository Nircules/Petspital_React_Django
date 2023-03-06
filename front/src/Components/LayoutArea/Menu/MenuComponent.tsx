import { NavLink } from "react-router-dom";
import "./MenuComponent.css";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useEffect, useState } from "react";
import SpecieModel from "../../../Models/SpecieModel";
import SubCategoryModel from "../../../Models/SubCategoryModel";
import TotalProducts from "../../ProductsArea/TotalProducts/TotalProducts";

function MenuComponent(): JSX.Element {
    interface CategoryModel {
        id: number;
        name: string;
        specieId: number;
        subcategories: SubCategoryModel[];
    }
    const [species, setSpecies] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://127.0.0.1:8000/species");
                const speciesList = await response.json() as SpecieModel[];
                const speciesWithCategories = await Promise.all(
                    speciesList.map(async (specie) => {
                        const categoriesResponse = await fetch(
                            'http://127.0.0.1:8000/categories_by_specie/' + specie.id
                        );
                        const categories = await categoriesResponse.json() as CategoryModel[];

                        const categoriesWithSubcategories = await Promise.all(
                            categories.map(async (category) => {
                                const subcategoriesResponse = await fetch(
                                    "http://127.0.0.1:8000/sub_categories_by_category/" + category.id
                                );
                                const subcategories = await subcategoriesResponse.json() as SubCategoryModel[];

                                const subcategoriesWithSubsubcategories = await Promise.all(
                                    subcategories.map(async (subcategory) => {
                                        const subsubcategoriesResponse = await fetch(
                                            "http://127.0.0.1:8000/specific_sub_cat/" + subcategory.id
                                        );
                                        const subsubcategories = await subsubcategoriesResponse.json();

                                        return {
                                            ...subcategory,
                                            subsubcategories,
                                        };
                                    })
                                );
                                return {
                                    ...category,
                                    subcategories: subcategoriesWithSubsubcategories,
                                };
                            })
                        );
                        return {
                            ...specie,
                            categories: categoriesWithSubcategories,
                        };
                    })
                );
                setSpecies(speciesWithCategories);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, []);

    return (
        <div className="MenuComponent">
            <hr />
            <Sidebar style={{ width: "100%" }}>
                <Menu>
                    <MenuItem component={<NavLink to="/" />} > Home </MenuItem>
                    <MenuItem component={<NavLink to="/products" />}> All Products </MenuItem>
                    <hr />
                    {species.map(specie => {
                        if (specie.categories.length > 0) {
                            return (<SubMenu label={specie.name} key={specie.id} >
                                {specie.categories.map((category: CategoryModel) => (
                                    <SubMenu label={category.name} key={category.id} id='CategoryLabel'>
                                        <MenuItem component={<NavLink to={"/category_products/" + category.id} />} id='SubCatLabel'>
                                            All
                                        </MenuItem>
                                        {category.subcategories.map(sub_cat => (
                                            <MenuItem component={<NavLink to={"/sub_category_products/" + sub_cat.id} />}
                                                key={sub_cat.id} id='SubCatLabel'>
                                                {sub_cat.name}</MenuItem>
                                        ))}
                                    </SubMenu>
                                ))}
                            </SubMenu>)
                        }
                    })}
                </Menu>
            </Sidebar>
        </div >
    );
}

export default MenuComponent;
