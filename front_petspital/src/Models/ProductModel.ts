class ProductModel {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public stock: number;
    public image: File;
    public createdTime: Date;
    public sub_category: number;
}

export default ProductModel;