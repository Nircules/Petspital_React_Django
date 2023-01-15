import SubCategoryModel from "./SubCategoryModel";

class ProductModel {
    public id: number;
    public name: string;
    public description: string;
    public createdTime: Date;
    public sub_category: number;
}

export default ProductModel;