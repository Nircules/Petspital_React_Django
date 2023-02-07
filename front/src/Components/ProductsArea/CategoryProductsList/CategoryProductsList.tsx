import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryProductsList.css";
import Loading from "../../SharedArea/Loading/Loading";

function CategoryProductsList(): JSX.Element {
    const params = useParams();
    const sub_cat_id = parseInt(params.subCategoryId)
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        productsService.subCategoryProducts(sub_cat_id)
            .then(productsFromBackend => setProducts(productsFromBackend))
            .catch(err => alert(err.message))
    }, [sub_cat_id])

    return (
        <div className="ProductsList">
            {products.length === 0 && <Loading />}
            <NavLink to="/products/new">➕</NavLink>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}

export default CategoryProductsList;
