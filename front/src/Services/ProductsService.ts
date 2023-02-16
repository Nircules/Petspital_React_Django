import axios from "axios";
import ProductModel from "../Models/ProductModel";
import config from "../Utils/Config";
import { ProductsActionTypes, productsStore } from "../Redux/ProductsState";

class ProductsService {

    public async fetchAllProducts(): Promise<ProductModel[]> {
        let products = productsStore.getState().products;
        const response = await axios.get<ProductModel[]>(config.productsUrl);
        products = response.data
        productsStore.dispatch({ type: ProductsActionTypes.FetchAllProducts, payload: products })
        return products;
    }

    public async subCategoryProducts(id: number): Promise<ProductModel[]> {
        let products = productsStore.getState().products;
        const response = await axios.get<ProductModel[]>(config.subCategoriesUrl + id);
        products = response.data
        productsStore.dispatch({ type: ProductsActionTypes.FetchCategoryProducts, payload: products })
        return products;
    }

    public async CategoryProducts(id: number): Promise<ProductModel[]> {
        let products = productsStore.getState().products;
        const response = await axios.get<ProductModel[]>(config.CategoriesUrl + id);
        products = response.data
        productsStore.dispatch({ type: ProductsActionTypes.FetchCategoryProducts, payload: products })
        return products;
    }


    public async getOneProductById(id: number): Promise<ProductModel> {
        let products = productsStore.getState().products;
        let product = products.find(p => p.id === id);
        if (!product) {
            const response = await axios.get<ProductModel>(config.productsUrl + id);
            product = response.data
        }
        return product;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();
        formData.append("name", product.name)
        formData.append("price", product.price.toString())
        formData.append("stock", product.stock.toString())
        formData.append("image", product.image.item(0))
        const response = await axios.post<ProductModel>(config.productsUrl, formData);
        const addedProduct = response.data;

        productsStore.dispatch({ type: ProductsActionTypes.AddProduct, payload: addedProduct })
        return addedProduct;
    }

    public async editProduct(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();

        formData.append("name", product.name)
        formData.append("price", product.price.toString())
        formData.append("stock", product.stock.toString())
        if (product.image) {
            formData.append("image", product.image.item(0))
        }
        const response = await axios.put<ProductModel>(config.productsUrl + product.id, formData)
        const editedProduct = response.data;

        productsStore.dispatch({ type: ProductsActionTypes.EditProduct, payload: editedProduct })
        return editedProduct;
    }

    public async deleteProduct(id: number): Promise<void> {
        await axios.delete(config.productsUrl + id);
        productsStore.dispatch({ type: ProductsActionTypes.DeleteProduct, payload: id })
    }
}

const productsService = new ProductsService();
export default productsService;
