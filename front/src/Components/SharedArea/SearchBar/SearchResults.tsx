import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import ProductCard from "../../ProductsArea/ProductCard/ProductCard";
import Loading from "../../SharedArea/Loading/Loading";

function SearchResults(): JSX.Element {
    const location = useLocation();
    console.log(location)
    const products = (location.state.searchResults as ProductModel[])
    console.log(products)
    
    return (
        <div className="ProductsList">
            <h1>Search Results</h1>
            {products.length === 0 && <Loading />}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}

export default SearchResults;
