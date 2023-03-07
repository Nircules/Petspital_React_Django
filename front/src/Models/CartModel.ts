import ProductModel from "./ProductModel";

class CartModel {
	public productsWithAmount: {
		product: ProductModel;
		amount: number;
	}[];

	constructor() {
    const cart = localStorage.getItem("cart");

    if (cart) {
      const container = JSON.parse(cart);
      this.productsWithAmount = container.productsWithAmount;
    } else {
      this.productsWithAmount = [];
    }
  }
  
}
export default CartModel;
