import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import ProductCard from "../../ProductsArea/ProductCard/ProductCard";
import Loading from "../../SharedArea/Loading/Loading";

function SearchResults(props: ProductModel[]): JSX.Element {
    // const [products, setProducts] = useState<ProductModel[]>([]);
    // useEffect(() => {
    //     productsService.fetchAllProducts()
    //         .then(productsFromBackend => setProducts(productsFromBackend))
    //         .catch(err => alert(err.message))
    // }, [])
    const products = props;

    return (
        <div className="ProductsList">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}

export default SearchResults;
