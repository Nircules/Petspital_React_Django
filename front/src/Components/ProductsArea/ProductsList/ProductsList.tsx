import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";
import Loading from "../../SharedArea/Loading/Loading";
import SearchBar from "../../SharedArea/SearchBar/SearchBar";

function ProductsList(): JSX.Element {
    const [products, setProducts] = useState<ProductModel[]>([]);
    useEffect(() => {
        productsService.fetchAllProducts()
            .then(productsFromBackend => setProducts(productsFromBackend))
            .catch(err => alert(err.message))
    }, [])

    return (
        <div className="ProductsList">
            <SearchBar />
            {products.length === 0 && <Loading />}
            <NavLink to="/products/new">➕</NavLink>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}

export default ProductsList;
