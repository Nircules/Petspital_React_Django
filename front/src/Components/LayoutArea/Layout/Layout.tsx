import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MenuComponent from "../Menu/MenuComponent";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header><Header></Header></header>
            <aside><MenuComponent></MenuComponent></aside>
            <main><Routing></Routing></main>
            <footer><Footer></Footer></footer>
        </div>
    );
}

export default Layout;
