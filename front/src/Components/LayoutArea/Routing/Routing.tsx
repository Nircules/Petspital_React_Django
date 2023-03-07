import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductsList from "../../ProductsArea/ProductsList/ProductsList";
import NotFound404 from "../NotFound404/NotFound404";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import SubCategoryProductsList from "../../ProductsArea/SubCategoryProductsList/SubCategoryProductsList";
import CategoryProductsList from "../../ProductsArea/CategoryProductsList/CategoryProductsList";
import SearchResults from "../../SharedArea/SearchBar/SearchResults";
import ProfileDetails from "../../AuthArea/ProfileDetails/ProfileDetails";
import EditProfile from "../../AuthArea/EditProfile/EditProfile";
import Checkout from "../../CartArea/Checkout/Checkout";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/products" element={<ProductsList />}></Route>
                <Route path="/search_results" element={<SearchResults />}></Route>
                <Route path="/sub_category_products/:subCategoryId" element={<SubCategoryProductsList />}></Route>
                <Route path="/category_products/:CategoryId" element={<CategoryProductsList />}></Route>
                <Route path="/products/details/:prodId" element={<ProductDetails />}></Route>
                <Route path="/products/new" element={<AddProduct />}></Route>
                <Route path="/products/edit/:prodToEdit" element={<EditProduct />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/user_profile/:user_id" element={<ProfileDetails />}></Route>
                <Route path="/edit_profile/:user_id" element={<EditProfile />}></Route>
                <Route path="/checkout" element={<Checkout />}></Route>
                <Route path="/*" element={<NotFound404 />}></Route>
            </Routes>
        </div>
    );
}

export default Routing;
