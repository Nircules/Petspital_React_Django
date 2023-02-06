import ProductModel from "../Models/ProductModel";
import { createStore } from "redux";

export class ProductsState {
    public products: ProductModel[] = [];
}

export enum ProductsActionTypes {
    FetchAllProducts = "Fetch All Products",
    FetchCategoryProducts = "Fetch Category Products",
    AddProduct = "Add Product",
    EditProduct = "Edit Prodcut",
    DeleteProduct = "Delete Product"
}

export interface ProductsAction {
    type: ProductsActionTypes,
    payload: any;
}

export function productsReducer(currentState = new ProductsState(), action: ProductsAction) {
    const newState = { ...currentState };
    switch (action.type) {
        case ProductsActionTypes.FetchAllProducts:
            newState.products = action.payload;
            break;
        case ProductsActionTypes.FetchCategoryProducts:
            newState.products = action.payload;
            break;
        case ProductsActionTypes.AddProduct:
            newState.products.push(action.payload)
            break;
        case ProductsActionTypes.EditProduct:
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.products[indexToUpdate] = action.payload;
            }
            break;
        case ProductsActionTypes.DeleteProduct:
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) {
                newState.products.splice(indexToDelete, 1)
            }
            break;
    }
    return newState
}

export const productsStore = createStore(productsReducer)
