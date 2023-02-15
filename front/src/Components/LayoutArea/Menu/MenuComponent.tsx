import { NavLink } from "react-router-dom";
import "./MenuComponent.css";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useEffect, useState } from "react";
import SpecieModel from "../../../Models/SpecieModel";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import CategoryModel from "../../../Models/CategoryModel";
import menuService from "./MenuFunctions";

function MenuComponent(): JSX.Element {

    interface SpeciesAndCategories {
        specie: Number;
        categories: CategoryModel[];
    }

    // const [species, setSpecies] = useState<SpecieModel[]>([]);
    // const [categoriesById, setCategoriesById] = useState<CategoryModel[]>([]);
    // const categoryList: CategoryModel[] = []
    // const specieAndCat: SpeciesAndCategories[] = [];
    // useEffect(() => {
    //     menuService.fetchSpecies()
    //         .then(speciesFromBack => (setSpecies(speciesFromBack)))
    //         .then(data => {
    //             console.log(data)
    //             species.forEach(specie => {
    //                 menuService.fetchCategories(specie.id)
    //                     .then(catFromBack => setCategoriesById(catFromBack))
    //                     .catch(err => alert(err.message))
    //                 const newObject: SpeciesAndCategories = {
    //                     specie: specie.id,
    //                     categories: categoriesById
    //                 }
    //                 specieAndCat.push(newObject)
    //             })
    //         })
    //         .catch(err => alert(err.message))
    // }, []);

    // species.map(specie => {
    //     menuService.fetchCategories(specie.id)
    //         .then(catFromBack => setCategoriesById(catFromBack))
    //         .catch(err => alert(err.message))
    //     const newObject: SpeciesAndCategories = {
    //         specie: specie.id,
    //         categories: categoriesById
    //     }
    //     specieAndCat.push(newObject)
    // })
    // console.log(specieAndCat)

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://127.0.0.1:8000/species");
                const speciesList = await response.json() as SpecieModel[];

                const speciesWithCategories = await Promise.all(
                    speciesList.map(async (specie) => {
                        const categoriesResponse = await fetch(
                            'http://127.0.0.1:8000/categories/' + specie.id
                        );
                        const categories = await categoriesResponse.json() as CategoryModel[];

                        const categoriesWithSubcategories = await Promise.all(
                            categories.map(async (category) => {
                                const subcategoriesResponse = await fetch(
                                    "http://127.0.0.1:8000/sub_categories/" + category.id
                                );
                                const subcategories = await subcategoriesResponse.json();

                                return {
                                    ...category,
                                    subcategories,
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
        console.log(species[0].categories[0].su)

    }, []);

    return (
        <div className="MenuComponent">
            <hr />
            <Sidebar className="Sidebar" style={{
                width: "100%", fontSize: "150%",
                background: "linear-gradient(90deg, rgba(255,213,145,1) 0%, rgba(255,229,186,1) 20%, rgba(255,229,186,1) 80%, rgba(255,213,145,1) 100%)",
                zIndex: 1,
            }}>
                <Menu menuItemStyles={{
                    button: ({ active, disabled }) => {
                        return {
                            color: disabled ? '#f5d9ff' : '#d359ff',
                            backgroundColor: active ? '#eecef9' : undefined,
                            ":hover": {
                                backgroundColor: "#008efe !important",
                                color: "white !important",
                                fontWeight: "bold !important"
                            }
                        };
                    },
                }}>
                    <MenuItem component={<NavLink to="/" />} > Home </MenuItem>
                    <MenuItem component={<NavLink to="/products" />}> All Products </MenuItem>
                    <hr />

                    {species.map(specie =>
                        <SubMenu label={specie.name} key={specie.id}>
                            {specie.categories.map((category: CategoryModel) => (
                                <SubMenu label={category.name} key={category.id}>
                                    { }
                                </SubMenu>
                            ))}
                        </SubMenu>)}
                </Menu>
            </Sidebar>
        </div >
    );
}

export default MenuComponent;
