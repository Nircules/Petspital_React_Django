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
        specie: SpecieModel;
        categories: CategoryModel[];
    }
    const [species, setSpecies] = useState<SpecieModel[]>([]);
    const [categoriesPerSpecie, setCategories] = useState<CategoryModel[]>([])
    const speciesDict: { [key: number]: SpeciesAndCategories } = {};
    useEffect(() => {
        menuService.fetchSpecies()
            .then(speciesFromBack => (setSpecies(speciesFromBack)))
            .catch(err => alert(err.message))
        
        species.forEach(specie => {
            menuService.fetchCategories(specie.id)
            
            // speciesDict[specie.id] = {specie: specie, categories: menuService.fetchCategories(specie.id)}
        })
        // console.log(speciesDict)

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
                            {categoriesPerSpecie.map(category =>
                                <SubMenu label={category.name} key={category.id} className="SubSub">
                                    <DropdownItem>Hi</DropdownItem>
                                    <DropdownItem>Hi</DropdownItem>
                                    <DropdownItem>Hi</DropdownItem>
                                    <DropdownItem>Hi</DropdownItem>
                                </SubMenu>)}
                        </SubMenu>)}
                    {species.map(specie => <SubMenu label={specie.name} key={specie.id}>

                    </SubMenu>)}
                </Menu>
            </Sidebar>

        </div >
    );
}

export default MenuComponent;
