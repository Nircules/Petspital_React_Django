import { NavLink } from "react-router-dom";
import "./MenuComponent.css";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function MenuComponent(): JSX.Element {

    return (
        <div className="MenuComponent">
            <Sidebar style={{
                width: "100%", fontSize: "150%",
                background: "linear-gradient(90deg, rgba(255,213,145,1) 0%, rgba(255,229,186,1) 20%, rgba(255,229,186,1) 80%, rgba(255,213,145,1) 100%)",
            }}>
                <Menu>
                    <MenuItem component={<NavLink to="/" />} > Home </MenuItem>
                    <MenuItem component={<NavLink to="/products" />}> All Products </MenuItem>
                    <SubMenu label="Categories">
                        <MenuItem> Cat 1 </MenuItem>
                        <MenuItem> Cat 2 </MenuItem>
                    </SubMenu>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar>
        </div >
    );
}

export default MenuComponent;
