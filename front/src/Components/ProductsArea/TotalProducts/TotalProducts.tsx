import "./TotalProducts.css";
import {useEffect, useState} from "react";
import {productsStore} from "../../../Redux/ProductsState";

function TotalProducts(): JSX.Element {
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        setCount(productsStore.getState().products.length)
        const unsubscribe = productsStore.subscribe(() => {
            setCount(productsStore.getState().products.length)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="TotalProducts">
            <span>Total Products : {count}</span>
        </div>
    );
}

export default TotalProducts;
