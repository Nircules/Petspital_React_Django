import { NavLink } from "react-router-dom";
import "./MenuComponent.css";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useEffect, useState } from "react";
import SpecieModel from "../../../Models/SpecieModel";
import config from "../../../Utils/Config";
import axios from "axios";

function MenuComponent(): JSX.Element {
    const [species, setSpecies] = useState<SpecieModel[]>([]);
    useEffect(() => {
        async function fetchSpecies() {
            const response = await axios.get<SpecieModel[]>('http://127.0.0.1:8000/species');
            return response.data
        }
        fetchSpecies()
            .then(speciesFromBack => setSpecies(speciesFromBack))
            .catch(err => alert(err.message))
    }, []);

    return (
        <div className="MenuComponent">
            <hr />
            <Sidebar className="Sidebar" style={{
                width: "100%", fontSize: "150%",
                background: "linear-gradient(90deg, rgba(255,213,145,1) 0%, rgba(255,229,186,1) 20%, rgba(255,229,186,1) 80%, rgba(255,213,145,1) 100%)",
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
                    {species.map(specie => <SubMenu label={specie.name} key={specie.id}>
                        <MenuItem component={<NavLink to={"/sub_category/" + specie.id} />}> Cat 1</MenuItem>
                        <MenuItem component={<NavLink to="/sub_category/2" />}> Cat 2 </MenuItem>
                    </SubMenu>)}
                </Menu>
            </Sidebar>

        </div >
    );
}

export default MenuComponent;
