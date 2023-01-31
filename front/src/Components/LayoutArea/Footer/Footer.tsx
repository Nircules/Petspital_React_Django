import "./Footer.css";

function Footer(): JSX.Element {

    const date = new Date().toLocaleDateString();

    return (
        <div className="Footer">
            <p>All Rights Reserved  &copy; {date}</p>
        </div>
    );
}

export default Footer;
