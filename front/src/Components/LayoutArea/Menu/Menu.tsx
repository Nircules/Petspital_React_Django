import {NavLink} from "react-router-dom";
import "./Menu.css";
import TotalProducts from "../../ProductsArea/TotalProducts/TotalProducts";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink><br/>
            <NavLink to="/products">Products</NavLink><br/>
            <TotalProducts/>
        </div>
    );
}

export default Menu;
