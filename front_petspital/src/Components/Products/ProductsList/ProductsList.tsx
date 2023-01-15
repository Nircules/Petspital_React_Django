import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import "./ProductsList.css";

function ProductsList(): JSX.Element {
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        productsService.fetchAllProducts()
            .then(productsFromBackend => setProducts(productsFromBackend))
            .catch(err => alert(err.message))
    }, [])

    return (
        <div className="ProductsList">

            <NavLink to="/products/new">➕</NavLink>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}

export default ProductsList;
