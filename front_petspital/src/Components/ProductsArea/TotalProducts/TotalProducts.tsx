import { useEffect, useState } from "react";
import { productsStore } from "../../../Redux/ProductsState";
import "./TotalProducts.css";

function TotalProducts(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        //Take products length when our site is up
        setCount(productsStore.getState().products.length)

        const unsubscribe = productsStore.subscribe(() => { //listen to any changes, and invoke the callback when something changed
            setCount(productsStore.getState().products.length)
        })

        return () => {
            unsubscribe();
        }

    }, [])


    return (
        <div className="TotalProducts">
            <span>Total Products: {count}</span>
        </div>
    );
}

export default TotalProducts;
