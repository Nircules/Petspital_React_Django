import { useLocation } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import ProductCard from "../../ProductsArea/ProductCard/ProductCard";

function SearchResults(): JSX.Element {
    const location = useLocation();
    console.log(location)
    const products = (location.state.searchResults as ProductModel[])
    console.log(products)

    return (
        <div className="ProductsList">
            <h1>Search Results</h1>
            {products.length === 0 && <div>Could not find what you are looking for.</div>}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}

export default SearchResults;
