import "./CategoryProductsList.css";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import Loading from "../../SharedArea/Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";

function CategoryProductsList(): JSX.Element {
    const params = useParams();
    const category_id = parseInt(params.CategoryId)
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        productsService.CategoryProducts(category_id)
            .then(productsFromBackend => setProducts(productsFromBackend))
            .catch(err => alert(err.message))
    }, [category_id])

    return (
        <div className="ProductsList">
            {products.length > 0 ? (
                <div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {products.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                </div>
            ) : (
                <div>
                    No Products here.
                </div>
            )}
        </div>
    );
}

export default CategoryProductsList;
