class Config {
    public supportEmail = "nirbengiat@gmail.com";
    public supportPhone = "0506789718";
    public supportPage = "";

    public productsUrl = "http://127.0.0.1:8000/products/";
    public productImagesUrl = "http://127.0.0.1:8000";
    public subCategoriesUrl = "http://127.0.0.1:8000/sub_category_products/";
    public CategoriesUrl = "http://127.0.0.1:8000/category_products/";
    public speciesUrl = "http://127.0.0.1:8000/species/"

    public registerUrl = "http://localhost:3030/api/auth/register/";
    public loginUrl = "http://127.0.0.1:8000/accounts/token/";
    public usersUrl = "http://127.0.0.1:8000/users/";
}

const config = new Config();

export default config;
