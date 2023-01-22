import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";


// 1. Global State -
export class ProductsState {
    public products: ProductModel[] = [];
}

// 2. Action Type - the list of operation we perform on our global state:
export enum ProductsActionType {
    FetchAllProducts = "Fetch All Products",
    AddProduct = "Add Product",
    EditProduct = "Edit Product",
    DeleteProduct = "Delete Product"
}

//3. Action - a single object which dispatch sends to Redux for some changes:
export interface ProductsAction {
    type: ProductsActionType,
    payload: any;
}


//4. Reducer - a function which will be invoked when calling dispatch to perform the operation 
export function productsReducer(currentState = new ProductsState(), action: ProductsAction) {

    const newState = { ...currentState };

    switch (action.type) {

        case ProductsActionType.FetchAllProducts: // Here the payload is a list of products (ProductsModel[])
            newState.products = action.payload;
            break;
        case ProductsActionType.AddProduct: //Here the payload is product to add (ProductModel)
            newState.products.push(action.payload);
            break;
        case ProductsActionType.EditProduct: //Here the payload is a product to Edit (ProductModel)
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id)
            if (indexToUpdate >= 0) {
                newState.products[indexToUpdate] = action.payload;
            }
            break;
        case ProductsActionType.DeleteProduct: //Here the payload is the id of the product to delete (number)
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) {
                newState.products.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}

//5. Store - manager object from redux which handles the entire operations: (dispatch, getState, subscribe)
export const productsStore = createStore(productsReducer);