class Config {
    public supportEmail = "support@northwind.com";
    public supportPhone = "031234567";
    public supportPage = "";

    public productsUrl = "http://127.0.0.1:8000/products";
    public productImagesUrl = "http://127.0.0.1:8000";
    public categoriesUrl = "http://127.0.0.1:8000/category/";

    public registerUrl = "http://localhost:3030/api/auth/register/";
    public loginUrl = "http://localhost:3030/api/auth/login/";
}

const config = new Config();

export default config;
